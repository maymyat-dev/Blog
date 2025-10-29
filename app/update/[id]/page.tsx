import CardForm from '@/components/card-form'
import { getPostById, updatePost } from '@/server/actions/post';


type UpdatePageProps = {
    params: {
        id: string;
    }
}

async function UpdatePage({ params }: UpdatePageProps) {
    const { id } = await params;
    const { success } = await getPostById(Number(id));
    console.log("Fetched post:", success);

    if (!success) {
    return <div className="text-red-500">Error: Post not found</div>;
  }
    
  return (
    <CardForm mode="edit" action={updatePost} defaultValues={success} />
  )
}

export default UpdatePage