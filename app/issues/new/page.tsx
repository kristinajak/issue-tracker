"use client";
import React, { useState } from "react";
import { z } from "zod";
import { Text } from "@radix-ui/themes";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, TextArea, Button, Callout } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchemas";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title?.message}
          </Text>
        )}
        <TextArea placeholder="Description" {...register("description")} />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description?.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
