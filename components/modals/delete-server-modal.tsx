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
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    try {
      setIsloading(true);

      await axios.delete(`/api/servers/${server?.id}`);
      router.refresh();
      router.push("/");
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
              Delete Server
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want t do this? <br />
              <span className="font-semibold text-indigo-500">
                {server?.name}
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
