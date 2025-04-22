import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlobeIcon, AwardIcon, PhoneIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export function CompanyInfo() {
  return (
    <Card className="border-0 shadow-none bg-background">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <div className="relative w-5 h-5 mr-2">
            <Image
              src="/drok-logo.png"
              alt="DROK Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          DROK Technologies
        </CardTitle>
        <CardDescription>
          Digital marketing & technology solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <GlobeIcon className="h-4 w-4 text-primary" />
            Global Presence
          </h3>
          <ul className="pl-6 space-y-1 text-muted-foreground list-disc">
            <li>Gurgaon, India - HQ (est. 2022)</li>
            <li>Dover, Delaware, USA (est. 2022)</li>
            <li>London, UK (est. 2025)</li>
          </ul>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <AwardIcon className="h-4 w-4 text-primary" />
            Key Achievements
          </h3>
          <ul className="pl-6 space-y-1 text-muted-foreground list-disc">
            <li>200+ clients served globally</li>
            <li>1200% revenue increase for US e-commerce client</li>
            <li>1328% boost in organic traffic</li>
            <li>Semrush Agency & Shopify Partner</li>
          </ul>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-primary" />
            Get in Touch
          </h3>
          <p className="text-muted-foreground">
            Schedule a free consultation at{' '}
            <a 
              href="https://www.digirocket.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.digirocket.io
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}