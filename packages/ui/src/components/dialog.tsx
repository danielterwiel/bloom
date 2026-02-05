import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "../lib/utils";

// ============================================================================
// Dialog Root
// ============================================================================

export interface DialogProps {
  /** Whether the dialog is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the dialog is modal (default: true) */
  modal?: boolean;
  /** The dialog content */
  children: React.ReactNode;
}

function DialogRoot({ open, defaultOpen, onOpenChange, modal = true, children }: DialogProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </BaseDialog.Root>
  );
}

DialogRoot.displayName = "Dialog";

// ============================================================================
// Dialog Trigger
// ============================================================================

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The trigger element */
  children: React.ReactNode;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <BaseDialog.Trigger ref={ref} className={className} {...props}>
      {children}
    </BaseDialog.Trigger>
  ),
);

DialogTrigger.displayName = "DialogTrigger";

// ============================================================================
// Dialog Portal (wrapper for backdrop and content)
// ============================================================================

export interface DialogPortalProps {
  /** The portal content (backdrop and popup) */
  children: React.ReactNode;
}

function DialogPortal({ children }: DialogPortalProps) {
  return <BaseDialog.Portal>{children}</BaseDialog.Portal>;
}

DialogPortal.displayName = "DialogPortal";

// ============================================================================
// Dialog Backdrop
// ============================================================================

export interface DialogBackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogBackdrop = React.forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Backdrop
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-foreground/50",
        // Animation
        "transition-opacity duration-150",
        "data-[ending-style]:opacity-0",
        "data-[starting-style]:opacity-0",
        className,
      )}
      {...props}
    />
  ),
);

DialogBackdrop.displayName = "DialogBackdrop";

// ============================================================================
// Dialog Content (Popup)
// ============================================================================

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The dialog content */
  children: React.ReactNode;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <BaseDialog.Popup
      ref={ref}
      className={cn(
        // Positioning
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        // Sizing
        "w-full max-w-lg max-h-[85vh] overflow-auto",
        // Styling
        "rounded-lg border border-border bg-surface p-6 shadow-elevated",
        // Animation
        "transition-[transform,opacity] duration-150",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  ),
);

DialogContent.displayName = "DialogContent";

// ============================================================================
// Dialog Header (layout helper)
// ============================================================================

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The header content */
  children: React.ReactNode;
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  ),
);

DialogHeader.displayName = "DialogHeader";

// ============================================================================
// Dialog Footer (layout helper)
// ============================================================================

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The footer content */
  children: React.ReactNode;
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    >
      {children}
    </div>
  ),
);

DialogFooter.displayName = "DialogFooter";

// ============================================================================
// Dialog Title
// ============================================================================

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The title text */
  children: React.ReactNode;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <BaseDialog.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight font-heading", className)}
      {...props}
    >
      {children}
    </BaseDialog.Title>
  ),
);

DialogTitle.displayName = "DialogTitle";

// ============================================================================
// Dialog Description
// ============================================================================

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** The description text */
  children: React.ReactNode;
}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <BaseDialog.Description
      ref={ref}
      className={cn("text-sm text-foreground-muted", className)}
      {...props}
    >
      {children}
    </BaseDialog.Description>
  ),
);

DialogDescription.displayName = "DialogDescription";

// ============================================================================
// Dialog Close Button
// ============================================================================

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The close button content (defaults to X icon) */
  children?: React.ReactNode;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => (
    <BaseDialog.Close
      ref={ref}
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity",
        "hover:opacity-100",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children ?? <CloseIcon />}
      <span className="sr-only">Close</span>
    </BaseDialog.Close>
  ),
);

DialogClose.displayName = "DialogClose";

// ============================================================================
// Exports
// ============================================================================

export {
  DialogRoot as Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
