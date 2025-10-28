import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

type AuthFooterProps = {
  footerLabel: string;
  footerHref: string;
};

function AuthFooter({ footerLabel, footerHref }: AuthFooterProps) {
  return (
    <div className="text-center">
      <Button variant="link" asChild>
        <Link href={footerHref} className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition">
          {footerLabel}
        </Link>
      </Button>
    </div>
  );
}

export default AuthFooter;
