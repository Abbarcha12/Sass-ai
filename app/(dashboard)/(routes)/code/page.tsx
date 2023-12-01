"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";
import { cn } from "@/lib/utils";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Code } from "lucide-react";
const CodePage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
       title="Code Generation"
       description="Generate code using descriptive text."
       icon={Code}
       iconColor="text-green-700"
       bgColor="bg-green-700/10"
      />
      <div className='px-4 lg:px-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              '>
            <FormField
              name='prompt'
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-10'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      disabled={isLoading}
                      placeholder='Simple toggle button with react hook'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className='col-span-12 lg:col-span-2 w-full'
              type='submit'
              disabled={isLoading}
              size='icon'>
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className='space-y-4 mt-4'>
        {isLoading && <Loader />}
        {messages.length === 0 && !isLoading && (
          <Empty label='No Code started.' />
        )}
      </div>
      <div className='space-y-4 mt-4'>
      <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodePage;
