"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from 'query-string'

export const DeleteChannelModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { channel, server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    try {
      setIsloading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })

      await axios.delete(url);
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Channel
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want t do this? <br />
              <span className="font-semibold text-indigo-500">
                #{channel?.name}
              </span> will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items=center justify-between w-full">
              <Button onClick={onClose} variant="ghost" disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={onClick} variant="primary" disabled={isLoading}>
                Comfirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
