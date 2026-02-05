import { describe, it, expect } from "vitest";
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../components/dialog";

describe("Dialog", () => {
  describe("Dialog (Root)", () => {
    it("has correct displayName", () => {
      expect(Dialog.displayName).toBe("Dialog");
    });

    it("renders with children", () => {
      const element = React.createElement(Dialog, {
        children: "Dialog content",
      });
      expect(element.type).toBe(Dialog);
      expect(element.props.children).toBe("Dialog content");
    });

    it("accepts open prop for controlled usage", () => {
      const element = React.createElement(Dialog, {
        open: true,
        children: "Content",
      });
      expect(element.props.open).toBe(true);
    });

    it("accepts defaultOpen prop for uncontrolled usage", () => {
      const element = React.createElement(Dialog, {
        defaultOpen: true,
        children: "Content",
      });
      expect(element.props.defaultOpen).toBe(true);
    });

    it("accepts onOpenChange callback", () => {
      const handleChange = () => {};
      const element = React.createElement(Dialog, {
        onOpenChange: handleChange,
        children: "Content",
      });
      expect(element.props.onOpenChange).toBe(handleChange);
    });

    it("accepts modal prop (default true)", () => {
      const element = React.createElement(Dialog, {
        modal: false,
        children: "Content",
      });
      expect(element.props.modal).toBe(false);
    });
  });

  describe("DialogTrigger", () => {
    it("has correct displayName", () => {
      expect(DialogTrigger.displayName).toBe("DialogTrigger");
    });

    it("renders with children", () => {
      const element = React.createElement(DialogTrigger, {
        children: "Open Dialog",
      });
      expect(element.props.children).toBe("Open Dialog");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogTrigger, {
        className: "custom-trigger",
        children: "Open",
      });
      expect(element.props.className).toBe("custom-trigger");
    });

    it("accepts standard button attributes", () => {
      const element = React.createElement(DialogTrigger, {
        disabled: true,
        type: "button",
        children: "Open",
      });
      expect(element.props.disabled).toBe(true);
      expect(element.props.type).toBe("button");
    });
  });

  describe("DialogPortal", () => {
    it("has correct displayName", () => {
      expect(DialogPortal.displayName).toBe("DialogPortal");
    });

    it("renders with children", () => {
      const element = React.createElement(DialogPortal, {
        children: "Portal content",
      });
      expect(element.props.children).toBe("Portal content");
    });
  });

  describe("DialogBackdrop", () => {
    it("has correct displayName", () => {
      expect(DialogBackdrop.displayName).toBe("DialogBackdrop");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogBackdrop, {
        className: "custom-backdrop",
      });
      expect(element.props.className).toBe("custom-backdrop");
    });

    it("accepts standard div attributes", () => {
      const element = React.createElement(DialogBackdrop, {
        id: "backdrop-id",
        "aria-hidden": true,
      });
      expect(element.props.id).toBe("backdrop-id");
      expect(element.props["aria-hidden"]).toBe(true);
    });
  });

  describe("DialogContent", () => {
    it("has correct displayName", () => {
      expect(DialogContent.displayName).toBe("DialogContent");
    });

    it("renders with children", () => {
      const element = React.createElement(DialogContent, {
        children: "Content here",
      });
      expect(element.props.children).toBe("Content here");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogContent, {
        className: "custom-content",
        children: "Content",
      });
      expect(element.props.className).toBe("custom-content");
    });

    it("accepts standard div attributes", () => {
      const element = React.createElement(DialogContent, {
        id: "content-id",
        role: "dialog",
        children: "Content",
      });
      expect(element.props.id).toBe("content-id");
      expect(element.props.role).toBe("dialog");
    });
  });

  describe("DialogHeader", () => {
    it("has correct displayName", () => {
      expect(DialogHeader.displayName).toBe("DialogHeader");
    });

    it("renders with children", () => {
      const element = React.createElement(DialogHeader, {
        children: "Header content",
      });
      expect(element.props.children).toBe("Header content");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogHeader, {
        className: "custom-header",
        children: "Header",
      });
      expect(element.props.className).toBe("custom-header");
    });
  });

  describe("DialogFooter", () => {
    it("has correct displayName", () => {
      expect(DialogFooter.displayName).toBe("DialogFooter");
    });

    it("renders with children", () => {
      const element = React.createElement(DialogFooter, {
        children: "Footer content",
      });
      expect(element.props.children).toBe("Footer content");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogFooter, {
        className: "custom-footer",
        children: "Footer",
      });
      expect(element.props.className).toBe("custom-footer");
    });
  });

  describe("DialogTitle", () => {
    it("has correct displayName", () => {
      expect(DialogTitle.displayName).toBe("DialogTitle");
    });

    it("renders with children", () => {
      const element = React.createElement(DialogTitle, {
        children: "Dialog Title",
      });
      expect(element.props.children).toBe("Dialog Title");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogTitle, {
        className: "custom-title",
        children: "Title",
      });
      expect(element.props.className).toBe("custom-title");
    });

    it("accepts standard heading attributes", () => {
      const element = React.createElement(DialogTitle, {
        id: "title-id",
        children: "Title",
      });
      expect(element.props.id).toBe("title-id");
    });
  });

  describe("DialogDescription", () => {
    it("has correct displayName", () => {
      expect(DialogDescription.displayName).toBe("DialogDescription");
    });

    it("renders with children", () => {
      const element = React.createElement(DialogDescription, {
        children: "This is a description",
      });
      expect(element.props.children).toBe("This is a description");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogDescription, {
        className: "custom-description",
        children: "Description",
      });
      expect(element.props.className).toBe("custom-description");
    });

    it("accepts standard paragraph attributes", () => {
      const element = React.createElement(DialogDescription, {
        id: "desc-id",
        children: "Description",
      });
      expect(element.props.id).toBe("desc-id");
    });
  });

  describe("DialogClose", () => {
    it("has correct displayName", () => {
      expect(DialogClose.displayName).toBe("DialogClose");
    });

    it("renders without children (uses default icon)", () => {
      const element = React.createElement(DialogClose, {});
      expect(element.props.children).toBeUndefined();
    });

    it("renders with custom children", () => {
      const element = React.createElement(DialogClose, {
        children: "Close",
      });
      expect(element.props.children).toBe("Close");
    });

    it("accepts className prop", () => {
      const element = React.createElement(DialogClose, {
        className: "custom-close",
      });
      expect(element.props.className).toBe("custom-close");
    });

    it("accepts standard button attributes", () => {
      const element = React.createElement(DialogClose, {
        disabled: true,
        "aria-label": "Close dialog",
      });
      expect(element.props.disabled).toBe(true);
      expect(element.props["aria-label"]).toBe("Close dialog");
    });
  });

  describe("composition", () => {
    it("composes Dialog with all subcomponents", () => {
      const element = React.createElement(
        Dialog,
        null,
        React.createElement(DialogTrigger, null, "Open"),
        React.createElement(
          DialogPortal,
          null,
          React.createElement(DialogBackdrop, null),
          React.createElement(
            DialogContent,
            null,
            React.createElement(DialogClose, null),
            React.createElement(
              DialogHeader,
              null,
              React.createElement(DialogTitle, null, "Title"),
              React.createElement(DialogDescription, null, "Description"),
            ),
            React.createElement(DialogFooter, null, "Footer content"),
          ),
        ),
      );

      expect(element.type).toBe(Dialog);
    });

    it("allows DialogHeader with Title and Description", () => {
      const header = React.createElement(
        DialogHeader,
        null,
        React.createElement(DialogTitle, null, "My Title"),
        React.createElement(DialogDescription, null, "My Description"),
      );

      expect(header.type).toBe(DialogHeader);
    });
  });
});
