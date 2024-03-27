import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

const HostGameTimeForm = ({
  startGame,
  form,
  timeFormOpen
}: {
  startGame: (data: { type: "10" | "30" | "60"; }) => void;
  form: UseFormReturn<
    {
      type: "10" | "30" | "60";
    },
    any,
    undefined
  >;
  timeFormOpen:boolean
}) => {
  return (
    <>
      <AlertDialog defaultOpen open={timeFormOpen}>
        <AlertDialogContent>
          <AlertDialogTitle className="mb-2 text-xl">
            How long do you want the battle to be?
          </AlertDialogTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(startGame)}
              className="space-y-6 flex flex-col w-full"
              >
                <div >

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>I want the battle to be...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="10" />
                          </FormControl>
                          <FormLabel className="font-normal">10s </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="30" />
                          </FormControl>
                          <FormLabel className="font-normal">30s </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="60" />
                          </FormControl>
                          <FormLabel className="font-normal">60s</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
              <div className="flex items-end justify-center">

              <Button type="submit">Start</Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HostGameTimeForm;
