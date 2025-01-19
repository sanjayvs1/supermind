"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiUrl } from '@/utils'
import { Brain, Building2, Check, Dumbbell, Gem, Heart, Home, NotebookIcon as Lotus, Moon, Music, Scroll, Sparkles, Stars, Sun, Users, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"

const HoroscopeDashboard = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [horoscope, setHoroscope] = React.useState({
        career: "",
        relationships: "",
        personal_growth: "",
        family: "",
        social_connections: "",
        daily_horoscope: "",
        monthly_horoscope: "",
        recommendations: {
            gemstones: [],
            pooja_recommendations: [],
            dos_and_donts: {
                dos: [],
                donts: []
            }
        },
        spiritual_content_delivery: {
            meditation_and_workout: {
                meditation: "",
                workout: ""
            },
            sleep_content: {
                type: "",
                recommendation: ""
            }
        }
    })

    const location = useLocation();
    useEffect(() => {
        const fetchHoroscope = async () => {
            try {
                setIsLoading(true)
                const { birthDate, city, state } = location.state;


                const response = await fetch(`${apiUrl}/horoscope`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        birthDate,
                        city,
                        state
                    })
                })
                const data = await response.json()
                console.log(data)
                setHoroscope(data)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching horoscope:', error)
            }
        }

        fetchHoroscope()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white relative overflow-hidden">
            {/* Constellation background */}
            <div className="absolute inset-0">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            opacity: Math.random(),
                            animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
                        }}
                    />
                ))}
            </div>
            <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-6">
                <div className="flex items-center gap-2 mb-8">
                    <Stars className="w-8 h-8 text-purple-300" />
                    <h1 className="text-3xl font-bold text-purple-100">Cosmic Insights
                        {isLoading && <span className="animate-pulse text-purple-300 ml-2">Loading...</span>}
                    </h1>
                </div>

                <Tabs defaultValue="daily" className="space-y-6">
                    <TabsList className="bg-black/50 border border-purple-500/30">
                        <TabsTrigger value="daily" className="data-[state=active]:bg-purple-700 text-white">
                            <Sun className="w-4 h-4 mr-2" />
                            Daily
                        </TabsTrigger>
                        <TabsTrigger value="monthly" className="data-[state=active]:bg-purple-700 text-white">
                            <Moon className="w-4 h-4 mr-2" />
                            Monthly
                        </TabsTrigger>
                        <TabsTrigger value="birth-chart" className="data-[state=active]:bg-purple-700 text-white">
                            <Stars className="w-4 h-4 mr-2" />
                            Birth Chart
                        </TabsTrigger>
                        <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-700 text-white">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Recommendations
                        </TabsTrigger>
                        <TabsTrigger value="spiritual" className="data-[state=active]:bg-purple-700 text-white">
                            <Lotus className="w-4 h-4 mr-2" />
                            Spiritual
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="daily" className="mt-6">
                        <Card className="bg-black/20 border-purple-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-300">
                                    <Sun className="text-yellow-500" />
                                    Daily Horoscope
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-purple-100">{horoscope.daily_horoscope}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="monthly">
                        <Card className="bg-black/20 border-purple-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-300">
                                    <Moon className="text-blue-300" />
                                    Monthly Horoscope
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-purple-100">{horoscope.monthly_horoscope}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="birth-chart">
                        <Card className="bg-black/20 border-purple-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-300">
                                    <Stars className="text-purple-300" />
                                    Birth Chart Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="space-y-2">
                                    <AccordionItem value="career" className="border-purple-500/30">
                                        <AccordionTrigger className="hover:bg-purple-900/20">
                                            <div className="flex items-center gap-2 text-purple-300">
                                                <Building2 className="text-purple-300" />
                                                Career Path
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-purple-100">
                                            {horoscope.career}
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="relationships" className="border-purple-500/30">
                                        <AccordionTrigger className="hover:bg-purple-900/20">
                                            <div className="flex items-center gap-2 text-purple-300">
                                                <Heart className="text-pink-400" />
                                                Relationships
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-purple-100">
                                            {horoscope.relationships}
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="growth" className="border-purple-500/30">
                                        <AccordionTrigger className="hover:bg-purple-900/20">
                                            <div className="flex items-center gap-2 text-purple-300">
                                                <Brain className="text-blue-300" />
                                                Personal Growth
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-purple-100">
                                            {horoscope.personal_growth}
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="family" className="border-purple-500/30">
                                        <AccordionTrigger className="hover:bg-purple-900/20">
                                            <div className="flex items-center gap-2 text-purple-300">
                                                <Home className="text-green-300" />
                                                Family
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-purple-100">
                                            {horoscope.family}
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="social" className="border-purple-500/30">
                                        <AccordionTrigger className="hover:bg-purple-900/20">
                                            <div className="flex items-center gap-2 text-purple-300">
                                                <Users className="text-yellow-300" />
                                                Social Connections
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-purple-100">
                                            {horoscope.social_connections}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="recommendations">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-black/20 border-purple-500/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-purple-300">
                                        <Gem className="text-pink-400" />
                                        Recommended Gemstones
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {horoscope.recommendations.gemstones.map((gem, index) => (
                                            <div key={index} className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                                                <h4 className="font-semibold text-purple-200">{gem.name}</h4>
                                                <p className="text-sm text-purple-300 mt-2">{gem.reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/20 border-purple-500/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-purple-300">
                                        <Lotus className="text-yellow-400" />
                                        Recommended Poojas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {horoscope.recommendations.pooja_recommendations.map((pooja, index) => (
                                            <div key={index} className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                                                <h4 className="font-semibold text-purple-200">{pooja.ritual}</h4>
                                                <p className="text-sm text-purple-300 mt-2">{pooja.importance}</p>
                                                <p className="text-sm text-purple-300 mt-1">{pooja.benefits}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/20 border-purple-500/30 md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-purple-300">
                                        <Scroll className="text-yellow-400" />
                                        Dos & Don'ts
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-green-300 flex items-center gap-2">
                                                <Check className="w-4 h-4" /> Dos
                                            </h4>
                                            <ul className="space-y-2">
                                                {horoscope.recommendations.dos_and_donts.dos.map((item, index) => (
                                                    <li key={index} className="text-green-100 text-sm flex items-start gap-2">
                                                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-red-300 flex items-center gap-2">
                                                <X className="w-4 h-4" /> Don'ts
                                            </h4>
                                            <ul className="space-y-2">
                                                {horoscope.recommendations.dos_and_donts.donts.map((item, index) => (
                                                    <li key={index} className="text-red-100 text-sm flex items-start gap-2">
                                                        <X className="w-4 h-4 mt-1 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="spiritual">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-black/20 border-purple-500/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-purple-300">
                                        <Lotus className="text-pink-400" />
                                        Meditation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-purple-100">{horoscope.spiritual_content_delivery.meditation_and_workout.meditation}</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/20 border-purple-500/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-purple-300">
                                        <Dumbbell className="text-green-400" />
                                        Workout
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-purple-100">{horoscope.spiritual_content_delivery.meditation_and_workout.workout}</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/20 border-purple-500/30 md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-purple-300">
                                        <Music className="text-blue-400" />
                                        Sleep Content
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-purple-100"><span className="font-semibold">Type:</span> {horoscope.spiritual_content_delivery.sleep_content.type}</p>
                                    <p className="text-purple-100 mt-2"><span className="font-semibold">Recommendation:</span> {horoscope.spiritual_content_delivery.sleep_content.recommendation}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default HoroscopeDashboard

