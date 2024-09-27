'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getPhotoURL } from '@/lib/utils';
import { uploadService } from '@/services';
import { ImagePlus, LucideLoader } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface UploadFormProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  handleUpload?: (data: any) => void;
  url?: string;
}

const UploadForm: React.FC<UploadFormProps> = ({
  form,
  name,
  label,
  handleUpload,
  url,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setLoading(true);
      const res = await uploadService.uploadPhoto(files[0]);
      const data = res?.data?.result;
      setSelectedFile(data);
      handleUpload?.(data);
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById(name)?.click();
  };

  useEffect(() => {
    if (url) {
      setSelectedFile(url);
    }
  }, [url]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({}) => (
        <FormItem className="space-y-3 w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {selectedFile ? (
              <div
                onClick={handleImageClick}
                className="relative cursor-pointer"
              >
                <Image
                  src={selectedFile}
                  alt="Selected"
                  className="rounded-md object-cover"
                  width={300}
                  height={300}
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id={name}
                  accept="image/*"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md opacity-0 hover:opacity-100 transition-opacity">
                  <ImagePlus className="text-white text-2xl" />
                </div>
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className="rounded-md border border-dashed border-gray-300 relative cursor-pointer w-full h-full max-w-[200px] max-h-[200px] flex items-center justify-center"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id={name}
                  accept="image/*"
                />
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LucideLoader className="animate-spin dark:text-white text-black" />
                  </div>
                ) : (
                  <ImagePlus />
                )}
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadForm;
