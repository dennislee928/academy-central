Three Pillars of API Security​Okay, now that we've got an idea where our top risks are, next is to figure out what we can do about them.And this is where we'll introduce the three pillars of API security, governance, monitoring, and testing. And we'll dig into each one of these individually.But at a high level, governance is all about defining and establishing and enforcing standard processes for developing APIs, testing APIs, getting them into production in a secure and consistent way. Monitoring is about runtime protection. Protecting our APIs in production, making sure they are behaving as expected. There aren't any attacks ongoing and other anomalous activity. And testing is all about making sure your APIs are free of vulnerabilities, that they perform as expected. And there aren't any flaws that can be exploited.

# Governance

##### [Three Pillars of API Security](https://university.apisec.ai/products/api-security-fundamentals-2025/categories/2157142278)

​So let's focus on governance first. The goal of governance is to establish consistency. Consistency in how your APIs get developed, how they get deployed, how they get tested, and everything else.

 It's important to set expectations for your engineering team in these governance policies. What's expected of your development teams when they're creating and publishing APIs? What are the documentation requirements? What are the authentication policies? How do we version our APIs and retire older APIs? It's about establishing standard processes for how APIs move from development into production in a consistent way.

 And enforcing security to make sure that nothing moves into production that hasn't gone through the same level of security assessment and vetting.

 There are two core components to governance. There's the awareness side, which is all about having proper visibility into what APIs you have, what infrastructure are they running on, what data do they have access to, and what risk do these APIs bring along with them?

And then on the other side, you have policy and process, which is about how do we go about developing our APIs? How do we deploy them? What documentation is required? What are our design and style guide requirements and so forth?

So let's dig further into the awareness side. This is all about knowing your APIs. Getting a full inventory of all your APIs. Why do they exist? Who owns them? Are they documented? What function are they performing? Where are they running? Do you have a comprehensive view across all of your APIs?

And you don't just want to know what APIs, you want to know the infrastructure. The app architecture, the containers, the virtual machines, what databases are they connected to the network infrastructure and really have a good understanding of how everything interconnects.

You want to standardize your deployment processes so that all APIs only get deployed in approved ways with proper validation. Nothing gets out there without following the process. No shadow or rogue APIs, as you've heard it called. And frankly, if that's happening, that's a sign of weak governance. There should be no ability for APIs to get into production without your knowledge, without going through these proper channels.

Now, the best way to enforce this is through the use of an API gateway. So you have a central control point where all APIs are being managed and that they're going through proper validation steps.

And we have to make documentation mandatory. The whole point of having APIs is so that other consumers can use them. Whether they're other developers inside our organization or external parties. This documentation is what allows them to know what your API does and how I can use this.

But this documentation is also critical for security. But we run across way too many organizations where documentation is missing, it's patchy, it's out of date. So really, strongly recommend that you make documentation of your APIs mandatory. This is a foundation of having good governance.

And then create your API development standards so that every engineering team, every development team creates APIs in a consistent standard way. And I'm talking about style guides, design guides, and the like. We'll talk more about that a little bit later.

 But let's talk some more about documentation as it's so important. What do we mean by API documentation? Well, the most common format out there is the OpenAPI specification. You might hear it called OAS or it used to be known as Swagger. This really is the industry standard for documenting REST APIs.

 It's typically in a YAML or JSON format that can be read by machines. And if you're publishing your APIs for external use, you want to make sure you're controlling what information you're making public. There are very easy ways to find these specifications on the internet. Clever Google searches can turn up your swagger files and attackers are looking for them. We find a lot of API specifications published on wide open Internet sites. It might be necessary. Maybe you need your API documentation to be publicly available.

But if possible, I definitely recommend making external users have to register, get validated before you give them access to those documentation. So make sure you're only publishing what needs to be out there and control access as much as you can.

Now the documentation itself is going to define everything about your API. The functionality of the endpoints, the description, where the API exists, the base URL, the endpoints, payloads, authentication requirements, parameters, data types, methods. All of that is captured in this documentation.

And you want to generate this documentation, this specification, as much as possible through automation. You can write it by hand, but if possible, we recommend that you auto generate this so that this documentation stays fully up to date. Instrument your code repos to automatically generate this specification. Insert the necessary comments and details into the repos to make sure the documentation comes out as complete as possible.

And let's take a look at what this documentation actually looks like. Here you can see an example on the left hand side is the raw YAML or JSON of a Swagger file or an OpenAPI specification.

There are documentation parsers that will take this and make it human readable. Some really great ones out there. I recommend you check out swagger.io. They've got a cloud based tool for parsing and visualizing your API docs. And this will help the consumer of your API understand in plain English with visual interfaces what your API does. But over on the left hand side, you'll see what the machine readable version looks like.

 And we recommend that you take time and define and publish your own API style guide. This is your organization's set of standards and conventions for how APIs get built. And it helps us make sure that all the APIs that get created in our organization look and feel the same.

It'll cover things like how you authenticate users. What type of authentication, when and where you use different kinds of authentication. It'll cover authorization. Who can access what and under what conditions with what permissions.

It'll even cover things like naming conventions. Like you typically want your URLs to be nouns and the methods to be the verbs. Whether you're posting a new record, putting in a new value, deleting an object. It even covers things like pluralization, hierarchy, language. Stay away from jargon, of course.

 Your error codes should be defined in your style guide as well. These should include status codes, reference IDs, human readable messages. But make sure that those messages aren't revealing useful information that could help a potential attacker. If you got an error code, you might want to say rejected, denied improper input or something like that. But you don't need to go further and say expecting an eight digit integer or something like that. That's just helping out your attacker.

The style guide will cover versioning when to increment, when not to, how to retire units and standards and so forth.

So I looked around and actually found this site on Atlassian. They're well known for having outstanding API documentation and style guides.

 Here's an example of their design guide for authentication. And what you see here is every REST API must have at minimum basic user authentication. Authorization is not handled at the API layer. It's the responsibility of the application itself. That's all defined right here in the design guide.

And similarly, we have a section on versions. It covers when do you need a new version? When you don't, what happens to the old versions. These are all the kinds of things that you should be thinking about and factoring into your style guides.