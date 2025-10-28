"use client"

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button'

type CustomButtonProps = {
  label?: string;
  icons?: React.ReactNode;
  className?: string;
}

function CustomButton({ label, icons, className }: CustomButtonProps) {
  const { pending } = useFormStatus()
  const showLabel = !icons && label;
  const showIcons = icons && !label;
  return (
    <Button className={className} disabled={pending} type="submit">
      {showIcons && <span>{icons}</span>}
      {showLabel && <span>{label}</span>}
    </Button>
  )
}

export default CustomButton