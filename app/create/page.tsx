
import CardForm from '@/components/card-form'
import { createPost } from '@/server/actions'

function CreateBlogPage() {
  return (
      <div>
          <CardForm action={createPost} mode="create"   />
    </div>
  )
}

export default CreateBlogPage