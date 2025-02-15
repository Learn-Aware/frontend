import { Copy, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

interface DialogCloseButtonProps {
  handleGenerateKey: () => void;
  isApiKeyGenerating: boolean;
  isShowKeyGeneratedModal: boolean;
  setIsShowKeyGeneratedModal: (value: boolean) => void;
}

export function DialogCloseButton({
  handleGenerateKey,
  isApiKeyGenerating,
  isShowKeyGeneratedModal,
  setIsShowKeyGeneratedModal,
}: DialogCloseButtonProps) {
  return (
    <>
      <Button
        onClick={handleGenerateKey}
        className="bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white transition-colors"
      >
        {isApiKeyGenerating ? (
          <>
            Generating ...
            <Loader2 className="animate-spin" size={16} />
          </>
        ) : (
          "Generate Key"
        )}
      </Button>
      <Dialog
        open={isShowKeyGeneratedModal}
        onOpenChange={setIsShowKeyGeneratedModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Copy key</DialogTitle>
            <DialogDescription>
              Use this key to authenticate your requests.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                API Key
              </Label>
              <Input
                id="link"
                defaultValue="https://leanawareai.com/api/v1?api_key=sk_LAAI675756GV45&GHvNHJGVhvhjvjhg^&%@!#VHCgh2435"
                readOnly
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3 bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white transition-colors"
            >
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsShowKeyGeneratedModal(false)}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
