import { describe, it, expect } from "vitest";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/card";

describe("Card", () => {
  describe("Card component", () => {
    it("has correct displayName", () => {
      expect(Card.displayName).toBe("Card");
    });

    it("renders with children", () => {
      const element = React.createElement(Card, { children: "Card content" });
      expect(element.type).toBe(Card);
      expect(element.props.children).toBe("Card content");
    });

    it("accepts className prop", () => {
      const element = React.createElement(Card, {
        className: "custom-card",
        children: "Content",
      });
      expect(element.props.className).toBe("custom-card");
    });

    it("accepts standard div attributes", () => {
      const element = React.createElement(Card, {
        id: "my-card",
        "aria-label": "Card description",
        role: "article",
        children: "Content",
      });
      expect(element.props.id).toBe("my-card");
      expect(element.props["aria-label"]).toBe("Card description");
      expect(element.props.role).toBe("article");
    });
  });

  describe("CardHeader component", () => {
    it("has correct displayName", () => {
      expect(CardHeader.displayName).toBe("CardHeader");
    });

    it("renders with children", () => {
      const element = React.createElement(CardHeader, { children: "Header content" });
      expect(element.type).toBe(CardHeader);
      expect(element.props.children).toBe("Header content");
    });

    it("accepts className prop", () => {
      const element = React.createElement(CardHeader, {
        className: "custom-header",
        children: "Header",
      });
      expect(element.props.className).toBe("custom-header");
    });
  });

  describe("CardTitle component", () => {
    it("has correct displayName", () => {
      expect(CardTitle.displayName).toBe("CardTitle");
    });

    it("renders with text children", () => {
      const element = React.createElement(CardTitle, { children: "My Card Title" });
      expect(element.type).toBe(CardTitle);
      expect(element.props.children).toBe("My Card Title");
    });

    it("accepts className prop", () => {
      const element = React.createElement(CardTitle, {
        className: "custom-title",
        children: "Title",
      });
      expect(element.props.className).toBe("custom-title");
    });
  });

  describe("CardDescription component", () => {
    it("has correct displayName", () => {
      expect(CardDescription.displayName).toBe("CardDescription");
    });

    it("renders with text children", () => {
      const element = React.createElement(CardDescription, {
        children: "A description of the card",
      });
      expect(element.type).toBe(CardDescription);
      expect(element.props.children).toBe("A description of the card");
    });

    it("accepts className prop", () => {
      const element = React.createElement(CardDescription, {
        className: "custom-description",
        children: "Description",
      });
      expect(element.props.className).toBe("custom-description");
    });
  });

  describe("CardContent component", () => {
    it("has correct displayName", () => {
      expect(CardContent.displayName).toBe("CardContent");
    });

    it("renders with children", () => {
      const element = React.createElement(CardContent, { children: "Main content here" });
      expect(element.type).toBe(CardContent);
      expect(element.props.children).toBe("Main content here");
    });

    it("accepts className prop", () => {
      const element = React.createElement(CardContent, {
        className: "custom-content",
        children: "Content",
      });
      expect(element.props.className).toBe("custom-content");
    });
  });

  describe("CardFooter component", () => {
    it("has correct displayName", () => {
      expect(CardFooter.displayName).toBe("CardFooter");
    });

    it("renders with children", () => {
      const element = React.createElement(CardFooter, { children: "Footer content" });
      expect(element.type).toBe(CardFooter);
      expect(element.props.children).toBe("Footer content");
    });

    it("accepts className prop", () => {
      const element = React.createElement(CardFooter, {
        className: "custom-footer",
        children: "Footer",
      });
      expect(element.props.className).toBe("custom-footer");
    });
  });

  describe("Composition", () => {
    it("components can be composed together", () => {
      const title = React.createElement(CardTitle, { children: "Title" });
      const description = React.createElement(CardDescription, { children: "Description" });
      const header = React.createElement(CardHeader, { children: [title, description] });
      const content = React.createElement(CardContent, { children: "Body content" });
      const footer = React.createElement(CardFooter, { children: "Footer" });
      const card = React.createElement(Card, { children: [header, content, footer] });

      expect(card.type).toBe(Card);
      expect(header.type).toBe(CardHeader);
      expect(content.type).toBe(CardContent);
      expect(footer.type).toBe(CardFooter);
    });

    it("header can contain title and description", () => {
      const title = React.createElement(CardTitle, { children: "My Title" });
      const description = React.createElement(CardDescription, { children: "My Description" });
      const header = React.createElement(CardHeader, { children: [title, description] });

      expect(header.type).toBe(CardHeader);
      expect(title.props.children).toBe("My Title");
      expect(description.props.children).toBe("My Description");
    });
  });
});
