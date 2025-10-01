import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    roomCount: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you shortly.");
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section id="quote" className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            Request a Quote
          </h2>
          <p className="text-lg text-muted-foreground">
            Tell us about your project and we'll get back to you with a
            complimentary quote.
          </p>
        </div>

        <Card className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex items-center gap-2 ${
                  step >= 1 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= 1
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}
                >
                  1
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  Project Details
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-border mx-4" />
              <div
                className={`flex items-center gap-2 ${
                  step >= 2 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= 2
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  Contact Info
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="projectType">Project Type</Label>
                  <RadioGroup
                    value={formData.projectType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, projectType: value })
                    }
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="new-construction"
                        id="new-construction"
                        data-testid="radio-new-construction"
                      />
                      <Label htmlFor="new-construction" className="font-normal">
                        New Construction
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="renovation"
                        id="renovation"
                        data-testid="radio-renovation"
                      />
                      <Label htmlFor="renovation" className="font-normal">
                        Renovation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="conversion"
                        id="conversion"
                        data-testid="radio-conversion"
                      />
                      <Label htmlFor="conversion" className="font-normal">
                        Conversion
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="roomCount">Estimated Room Count</Label>
                  <Select
                    value={formData.roomCount}
                    onValueChange={(value) =>
                      setFormData({ ...formData, roomCount: value })
                    }
                  >
                    <SelectTrigger
                      id="roomCount"
                      className="mt-2"
                      data-testid="select-room-count"
                    >
                      <SelectValue placeholder="Select room count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50 Rooms</SelectItem>
                      <SelectItem value="51-100">51-100 Rooms</SelectItem>
                      <SelectItem value="101-200">101-200 Rooms</SelectItem>
                      <SelectItem value="200+">200+ Rooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Project Description</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="mt-2 min-h-32"
                    data-testid="textarea-message"
                  />
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full"
                  data-testid="button-next-step"
                >
                  Next Step
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-2"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-2"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-2"
                    data-testid="input-phone"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                    data-testid="button-prev-step"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    data-testid="button-submit-quote"
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
}
