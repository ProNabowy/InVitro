import React from "react";
import { DoctorCard } from "../../src/components";
import { AppProvider } from "../../src/context/AppContext";

describe("DoctorCard.cy.jsx", () => {
  const mockDoctor = {
    id: "test-doc-1",
    name: "Dr. Test Doctor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    availability: [
      { time: "10:00 AM", date: "April 23, 2024" },
      { time: "01:00 PM", date: "April 24, 2024" },
    ],
    rate: "4.8",
    available: true,
    location: "Test City, TC",
    specialty: "Testology",
    tags: ["Test", "Testing"],
  };

  it("renders doctor information correctly", () => {
    cy.mount(
      <AppProvider>
        <DoctorCard doctor={mockDoctor} />
      </AppProvider>
    );

    // Check if doctor name is displayed
    cy.contains("Dr. Test Doctor").should("exist");

    // Check if doctor image is displayed
    cy.get("img").should("have.attr", "alt", "Doctor Dr. Test Doctor");

    // Check if doctor rating is displayed
    cy.contains("4.8").should("exist");

    // Check if doctor availability is displayed
    cy.contains("Available").should("exist");

    // Check if book button is displayed for available doctors
    cy.contains("Book Now").should("exist");
  });

  it("handles keyboard navigation correctly", () => {
    cy.mount(
      <AppProvider>
        <DoctorCard doctor={mockDoctor} />
      </AppProvider>
    );

    // Check if the book button is focusable
    cy.get("button").focus();

    // Check if the book button has the correct tabIndex
    cy.get("button").should("have.attr", "tabIndex", "0");
  });

  it("renders unavailable doctor correctly", () => {
    const unavailableDoctor = {
      ...mockDoctor,
      available: false,
    };

    cy.mount(
      <AppProvider>
        <DoctorCard doctor={unavailableDoctor} />
      </AppProvider>
    );

    // Check if doctor availability is displayed as unavailable
    cy.contains("Unavailable").should("exist");

    // Check if book button is not displayed for unavailable doctors
    cy.contains("Book Now").should("not.exist");
  });
});
