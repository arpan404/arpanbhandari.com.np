import Link from 'next/link';

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function WritingBreadcrumb() {
   return (
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/" className="select-none">
                     Home
                  </Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/writings" className="select-none">
                     Writings
                  </Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   );
}
