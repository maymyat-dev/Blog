import CustomButton from "@/components/custom-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CardFormProps = {
  action: (formData: FormData) => Promise<any>;
  mode: "create" | "edit";
  defaultValues?: {
    id?: number;
    title: string;
    body: string;
  }
}

function CardForm({ action, mode, defaultValues }: CardFormProps) {
  const isEdit = mode == "edit";
  return (
      <div className="w-full md:w-1/2 mx-auto mt-20 px-10 md:px-0">
          <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Post" : "Create Post"}</CardTitle>
        <CardDescription>{isEdit ? "Update your existing blog post" : "Write and share your new blog post"}</CardDescription>
      </CardHeader>
      <CardContent>
          <form action={action} className="grid gap-4">
            {
              isEdit && (
                <input type="hidden" name="id" value={defaultValues?.id} />
              )}
          <Input defaultValue={defaultValues?.title} type="text" name="title" placeholder="Blog Title" className="w-full" />
          <Textarea defaultValue={defaultValues?.body} placeholder="Write your content here" name="body" className="w-full h-40" />
          <CustomButton  label={isEdit ? "Update" : "Create"} className="mt-4 w-full " />
        </form>
      </CardContent>
    </Card>
    </div>
  );
}

export default CardForm;
