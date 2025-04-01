
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IdCard, Mail, MailCheck, Check, Upload, ArrowRight, Shield } from "lucide-react";

// Form schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().optional(),
});

const emailVerificationSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

const idVerificationSchema = z.object({
  idType: z.enum(["passport", "driverLicense", "nationalId"], {
    required_error: "Please select an ID type",
  }),
  idNumber: z.string().min(5, "ID number must be at least 5 characters"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

const AccountSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emailVerified, setEmailVerified] = useState(false);
  const [idVerified, setIdVerified] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [idPhotoUploaded, setIdPhotoUploaded] = useState(false);
  const [idSubmitted, setIdSubmitted] = useState(false);
  
  // Profile form
  const profileForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      bio: "XForge enthusiast and gaming professional.",
    },
  });

  // Email verification form
  const emailForm = useForm<z.infer<typeof emailVerificationSchema>>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "john.doe@example.com",
    },
  });

  // ID verification form
  const idForm = useForm<z.infer<typeof idVerificationSchema>>({
    resolver: zodResolver(idVerificationSchema),
    defaultValues: {
      idType: "passport",
      idNumber: "",
      agreeToTerms: false,
    },
  });

  const onProfileSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    console.log("Profile data:", data);
  };

  const onSendEmailVerification = (data: z.infer<typeof emailVerificationSchema>) => {
    setEmailVerificationSent(true);
    toast({
      title: "Verification email sent",
      description: `A verification link has been sent to ${data.email}`,
    });
    console.log("Email verification sent to:", data.email);
    
    // Simulate email verification after 3 seconds (for demo purposes)
    setTimeout(() => {
      setEmailVerified(true);
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      });
    }, 3000);
  };

  const handleVerifyId = (data: z.infer<typeof idVerificationSchema>) => {
    if (!idPhotoUploaded) {
      toast({
        title: "Upload required",
        description: "Please upload a photo of your ID first",
        variant: "destructive",
      });
      return;
    }
    
    setIdSubmitted(true);
    toast({
      title: "ID verification submitted",
      description: "Your ID verification has been submitted and is pending review.",
    });
    console.log("ID verification data:", data);
    
    // Simulate ID verification after 5 seconds (for demo purposes)
    setTimeout(() => {
      setIdVerified(true);
      toast({
        title: "ID verified",
        description: "Your government ID has been successfully verified.",
      });
    }, 5000);
  };

  const handleIdPhotoUpload = () => {
    setIdPhotoUploaded(true);
    toast({
      title: "Photo uploaded",
      description: "Your ID photo has been uploaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and verification</p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Brief description for your profile.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Verification Tab */}
            <TabsContent value="verification" className="space-y-4 mt-4">
              {/* Email Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Verification
                    {emailVerified && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <Check className="w-3 h-3 mr-1" /> Verified
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Verify your email address to secure your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onSendEmailVerification)} className="space-y-4">
                      <FormField
                        control={emailForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input {...field} readOnly={emailVerified} />
                                <Button 
                                  type="submit" 
                                  disabled={emailVerified || emailVerificationSent}
                                  variant={emailVerified ? "outline" : "default"}
                                >
                                  {emailVerified ? (
                                    <span className="flex items-center">
                                      <MailCheck className="w-4 h-4 mr-2" />
                                      Verified
                                    </span>
                                  ) : emailVerificationSent ? (
                                    "Sent"
                                  ) : (
                                    "Verify"
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription>
                              {emailVerified 
                                ? "Your email has been verified." 
                                : emailVerificationSent 
                                  ? "Check your inbox for the verification link." 
                                  : "We'll send a verification link to this email."}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* ID Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IdCard className="h-5 w-5" />
                    Government ID Verification
                    {idVerified && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <Check className="w-3 h-3 mr-1" /> Verified
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Verify your identity with a government-issued ID
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {idVerified ? (
                    <div className="bg-muted p-4 rounded-md">
                      <p className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                        <Shield className="w-4 h-4 mr-2" />
                        Your identity has been verified. Thank you for completing the verification process.
                      </p>
                    </div>
                  ) : idSubmitted ? (
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm">
                        Your ID verification is being processed. This usually takes 1-3 business days.
                      </p>
                    </div>
                  ) : (
                    <Form {...idForm}>
                      <form onSubmit={idForm.handleSubmit(handleVerifyId)} className="space-y-4">
                        <FormField
                          control={idForm.control}
                          name="idType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID Type</FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  {...field}
                                >
                                  <option value="passport">Passport</option>
                                  <option value="driverLicense">Driver's License</option>
                                  <option value="nationalId">National ID</option>
                                </select>
                              </FormControl>
                              <FormDescription>
                                Select the type of government ID you will provide
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={idForm.control}
                          name="idNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Enter the number shown on your ID
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-2">
                          <FormLabel>ID Photo</FormLabel>
                          <div className="border-2 border-dashed border-input rounded-md p-6 flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-1">
                              Drag and drop your ID image, or click to browse
                            </p>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleIdPhotoUpload}
                              className="mt-2"
                              disabled={idPhotoUploaded}
                            >
                              {idPhotoUploaded ? "Uploaded" : "Upload ID"}
                            </Button>
                          </div>
                        </div>
                        
                        <FormField
                          control={idForm.control}
                          name="agreeToTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I confirm that the information provided is accurate and belongs to me
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit">Submit for Verification</Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Collapsible className="w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-muted-foreground">
                          Update your password regularly for better security
                        </p>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <FormLabel>Current Password</FormLabel>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>New Password</FormLabel>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-medium text-destructive">Danger Zone</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountSettings;
