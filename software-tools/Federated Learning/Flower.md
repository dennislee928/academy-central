# Flower (flwr)

## Core Features
Flower is a framework-agnostic federated learning platform that seamlessly integrates with PyTorch, TensorFlow, JAX, and others. It features robust support for heterogeneous computing, easily scaling from high-end GPU servers down to low-power edge devices and mobile phones.

## Primary Use Cases
General-purpose federated learning, IoT sensor networks, and TinyML. It is widely used to train models across disparate edge devices while keeping all raw data localized and private.

## Getting Started / Instructional Guide
Install Flower using `pip install flwr`. Define your machine learning model using your preferred framework (e.g., PyTorch). Implement a Flower Client by subclassing `flwr.client.NumPyClient` to handle local training and evaluation. Start a Flower Server using `flwr.server.start_server`, and then connect multiple clients to begin the federated training process.