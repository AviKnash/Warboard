import { Server, Socket } from "socket.io";
import { generateParagraph } from "../utils/generateParagraph";
import { rooms } from "../listeners";
import { calculateWPM } from "../utils/calculateWPM";

export class Game {
  gameStatus: "not-started" | "in-progress" | "finished";
  gameId: string;
  players: { id: string; score: number; name: string; wpm: number }[];
  io: Server;
  gameHost: string;
  paragraph: string;

  constructor(id: string, io: Server, host: string) {
    this.gameId = id;
    this.gameHost = host;
    this.io = io;
    this.gameStatus = "not-started";
    this.paragraph = "";
    this.players = [];
  }

  setupListeners(socket: Socket) {
    socket.on("start-game", async () => {
      if (this.gameStatus === "in-progress") {
        return socket.emit("error", "The game has already started");
      }

      if (this.gameHost !== socket.id) {
        return socket.emit("error", "You are not the host of the game.");
      }

      for (const player of this.players) {
        player.score = 0;
      }

      this.io.to(this.gameId).emit("players", this.players);

      this.gameStatus = "in-progress";

      const paragraph = await generateParagraph();
      this.paragraph = paragraph;
      this.io.to(this.gameId).emit("game-started", paragraph);
    });

    socket.on("finish-game", () => {
      this.gameStatus = "finished";
      this.io.to(this.gameId).emit("game-finished");
      this.io.to(this.gameId).emit("players", this.players);
    });

    socket.on("count-down", (countDown: number) => {
      console.log("start time is", countDown);
      if (this.gameStatus === "finished") return;

      const countDownTimer = setInterval(() => {
        this.io.to(this.gameId).emit("counting-down", (countDown -= 1));

        if (countDown === 0) {
          clearInterval(countDownTimer);
        }
      }, 1000);
    });

    socket.on("game-timer", (gamingTimer: number) => {

      if (this.gameStatus === "finished") return;

      const gameInterval = setInterval(() => {
        console.log("game timer is", gamingTimer);
        if (gamingTimer === 0 || this.gameStatus === "finished") {
          clearInterval(gameInterval);
        }
        this.io.to(this.gameId).emit("gaming-left", (gamingTimer -= 1));
      }, 1000);
    });

    socket.on("typed-errors", (errors: number, id: string) => {
      console.log("Errors are", errors, "from", id);

      this.io.to(id).emit("recieved-errors", errors);
    });

    socket.on("player-typed", (typed: string) => {
      console.log(typed);
      if (this.gameStatus !== "in-progress")
        return socket.emit("error", "The game has not started here.");

      const player = this.players.find((player) => player.id === socket.id);

      if (player) {
        player.score++;
        const wpm = calculateWPM(player.score);
        player.wpm = wpm;
        this.io.to(this.gameId).emit("player-score", {
          id: socket.id,
          score: player.score,
          wpm: player.wpm,
        });

        const otherPlayer = this.players.find((p) => p.id !== socket.id);
        if (otherPlayer) {
          socket
            .to(otherPlayer.id)
            .emit("typed-letter", { id: socket.id, letter: typed });
        }
      }
    });

    socket.on("leave", () => {
      if (socket.id === this.gameHost) {
        this.players = this.players.filter((player) => player.id !== socket.id);

        if (this.players.length !== 0) {
          this.gameHost = this.players[0].id;
          this.io.to(this.gameId).emit("new-host", this.gameHost);
          this.io.to(this.gameId).emit("player-left", socket.id);
        } else {
          rooms.delete(this.gameId);
        }
      }

      socket.leave(this.gameId);
      this.players = this.players.filter((player) => player.id !== socket.id);
      this.io.to(this.gameId).emit("player-left", socket.id);
    });

    socket.on("disconnect", () => {
      if (socket.id === this.gameHost) {
        this.players = this.players.filter((player) => player.id !== socket.id);

        if (this.players.length !== 0) {
          this.gameHost = this.players[0].id;
          this.io.to(this.gameId).emit("new-host", this.gameHost);
          this.io.to(this.gameId).emit("player-left", socket.id);
        } else {
          rooms.delete(this.gameId);
        }
      }

      socket.leave(this.gameId);
      this.players = this.players.filter((player) => player.id !== socket.id);
      this.io.to(this.gameId).emit("player-left", socket.id);
    });
  }

  joinPlayer(id: string, name: string, socket: Socket) {
    if (this.gameStatus === "in-progress") {
      return socket.emit(
        "error",
        "Game has already started, please wait for it to end before joining!"
      );
    }

    this.players.push({ id, name, score: 0, wpm: 0 });
    this.io.to(this.gameId).emit("player-joined", {
      id,
      name,
      score: 0,
      wpm: 0,
    });

    socket.emit("players", this.players);
    socket.emit("new-host", this.gameHost);

    this.setupListeners(socket);
  }
}
