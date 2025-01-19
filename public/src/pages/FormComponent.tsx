import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Loader2, Stars } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Vortex } from "@/components/ui/vortex";
import HoroscopeChatSheet from "./HoroscopeChatSheet";
import ProcessingPopup from "./Kundli";
import { Link, useNavigate } from "react-router-dom";

// Zod schema for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  time: z.string().min(1, { message: "Birth time is required" }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters" })
    .max(50, { message: "State must be less than 50 characters" }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters" })
    .max(50, { message: "City must be less than 50 characters" }),
});

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kundli, setKundli] = useState()


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: undefined,
      time: "",
      gender: "",
      state: "",
      city: "",
    },
  });

  const onSubmit = async (data: any) => {
    const navigate = useNavigate();
    try {
      setIsLoading(true);
      console.log("hello")
      const { dob, city, state } = data;
      navigate(`/dashboard`, {
        state: {
          birthDate: dob,
          city: city,
          state: state
        },
      });
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Vortex backgroundColor="black" className="flex bg-black/30 items-center justify-center px-2 md:px-10 py-4 w-full h-full">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-center">
          {/* Left side content */}
          <div className="w-full md:w-1/2 text-purple-200 space-y-6">
            {
              !kundli ? (
                <>
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-200">
                      Welcome to Soultalk
                    </h1>
                    <p className="text-xl text-purple-300">Your Gateway to Cosmic Wisdom</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Stars className="w-6 h-6 mt-1 text-purple-400" />
                      <div>
                        <h3 className="text-lg font-semibold">Personalized Kundli Analysis</h3>
                        <p className="text-purple-300/80">Discover your life path through detailed birth chart analysis and planetary positions.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Stars className="w-6 h-6 mt-1 text-purple-400" />
                      <div>
                        <h3 className="text-lg font-semibold">Expert Solutions</h3>
                        <p className="text-purple-300/80">Get personalized gemstone recommendations and spiritual guidance for life's challenges.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Stars className="w-6 h-6 mt-1 text-purple-400" />
                      <div>
                        <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
                        <p className="text-purple-300/80">Experience our advanced chatbot for instant spiritual advice and cosmic insights.</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <h1>Kundli</h1>
              )
            }

          </div>

          {/* Right side form */}
          <Card className="w-full md:w-1/2 bg-black/30 backdrop-blur-md border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-200">
                Begin Your Celestial Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-200">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="bg-white/10 border-purple-500/30 text-purple-100 placeholder:text-purple-200/50"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <Link
                    to="/chat"
                    className="inline-flex items-center px-4 py-2 bg-purple-900/50 border border-purple-500/50 text-purple-100 hover:bg-purple-800/50 rounded-md"
                  >
                    <Stars className="w-4 h-4 mr-2" />
                    Consult the Oracle
                  </Link>
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-200">Date and Time of Birth</FormLabel>
                        <FormControl>
                          <Input

                            placeholder="Enter your Date and time of Birth"
                            {...field}
                            className="bg-white/10 border-purple-500/30 text-purple-100 placeholder:text-purple-200/50"
                            disabled={isLoading}>
                          </Input>
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />


                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-200">Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-purple-500/30 text-purple-100">
                              <SelectValue
                                placeholder="Select your gender"
                                className="text-purple-200/50"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-200">State</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your state"
                              {...field}
                              className="bg-white/10 border-purple-500/30 text-purple-100 placeholder:text-purple-200/50"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-200">City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your city"
                              {...field}
                              className="bg-white/10 border-purple-500/30 text-purple-100 placeholder:text-purple-200/50"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      "Reveal My Destiny"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Vortex>
    </div>
  );
};

export default FormComponent;