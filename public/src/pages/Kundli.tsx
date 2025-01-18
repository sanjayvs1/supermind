import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, Stars, Sparkles, Bot, Gem } from "lucide-react";

const ProcessingPopup = ({ isOpen }: { isOpen: boolean }) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [completedSteps, setCompletedSteps] = React.useState([]);

    const steps = [
        {
            title: "Generating Kundali",
            description: "Calculating planetary positions using Swiss Ephemeris",
            icon: Stars,
        },
        {
            title: "Analyzing Cosmic Patterns",
            description: "Synthesizing celestial influences and alignments",
            icon: Sparkles,
        },
        {
            title: "Personalizing Recommendations",
            description: "Determining optimal gemstones and rituals",
            icon: Gem,
        },
        {
            title: "Preparing Spiritual Guidance",
            description: "Configuring AI for personalized spiritual advice",
            icon: Bot,
        }
    ];

    React.useEffect(() => {
        if (isOpen) {
            const timer = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        setCompletedSteps((completed) => [...completed, prev]);
                        return prev + 1;
                    }
                    clearInterval(timer);
                    return prev;
                });
            }, 2000);

            return () => clearInterval(timer);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen}>
            <DialogContent className="bg-black/95 border-purple-500/30 text-purple-200 max-w-md">
                <div className="space-y-6 p-2">
                    <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-200">
                        Revealing Your Cosmic Blueprint
                    </h2>

                    <div className="space-y-4">
                        {steps.map((step, index) => {
                            const isActive = currentStep === index;
                            const isCompleted = completedSteps.includes(index);
                            const Icon = step.icon;

                            return (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 ${isActive ? 'bg-purple-500/10 scale-105' : ''
                                        } ${isCompleted ? 'opacity-60' : 'opacity-100'}`}
                                >
                                    <div className="flex-shrink-0">
                                        {isActive ? (
                                            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                                        ) : (
                                            <Icon className="w-6 h-6 text-purple-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{step.title}</h3>
                                        <p className="text-sm text-purple-300/80">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="text-center text-sm text-purple-300/60 animate-pulse">
                        {currentStep < steps.length - 1 ? "Please wait while we process your details..." : "Almost ready..."}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProcessingPopup;