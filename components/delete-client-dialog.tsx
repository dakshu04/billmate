"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertTriangle, Trash2 } from "lucide-react"

interface DeleteClientDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (deleteInvoices: boolean) => Promise<void>
  clientName: string
  invoiceCount: number
}

export function DeleteClientDialog({ isOpen, onClose, onConfirm, clientName, invoiceCount }: DeleteClientDialogProps) {
  const [deleteInvoices, setDeleteInvoices] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleConfirm = async () => {
    setError("")
    setIsDeleting(true)

    try {
      await onConfirm(deleteInvoices)
      onClose()
    } catch (err) {
      console.error("[v0] Error deleting client:", err)
      setError("Failed to delete client. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    if (!isDeleting) {
      setDeleteInvoices(false)
      setError("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Client
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{clientName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {invoiceCount > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This client has <strong>{invoiceCount}</strong> associated invoice{invoiceCount !== 1 ? "s" : ""}.
                Choose what to do with them:
              </AlertDescription>
            </Alert>
          )}

          {invoiceCount > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keep-invoices"
                  checked={!deleteInvoices}
                  onCheckedChange={(checked: unknown) => setDeleteInvoices(!checked)}
                  disabled={isDeleting}
                />
                <label
                  htmlFor="keep-invoices"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep invoices (recommended)
                </label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                Invoices will be preserved but marked as having no associated client
              </p>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="delete-invoices"
                  checked={deleteInvoices}
                  onCheckedChange={(checked: any) => setDeleteInvoices(!!checked)}
                  disabled={isDeleting}
                />
                <label
                  htmlFor="delete-invoices"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive"
                >
                  Delete all invoices permanently
                </label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                This will permanently delete all {invoiceCount} invoice{invoiceCount !== 1 ? "s" : ""} and cannot be
                undone
              </p>
            </div>
          )}

          {invoiceCount === 0 && (
            <Alert>
              <AlertDescription>This client has no associated invoices and can be safely deleted.</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Client
                {deleteInvoices && invoiceCount > 0 && " & Invoices"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
