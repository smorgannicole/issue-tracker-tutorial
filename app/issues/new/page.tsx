"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <TextField.Root
          id="title"
          {...register("title", { required: "Title is required" })}
        ></TextField.Root>
        {errors.title && (
          <span role="alert" className="text-red-500 text-sm">
            {errors.title.message}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => <SimpleMDE id="description" {...field} />}
        />
        {errors.description && (
          <span role="alert" className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
