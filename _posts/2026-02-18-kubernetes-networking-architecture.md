---
layout: post
title: "How Kubernetes Connects Pods Using Services and DNS"
date: 2026-02-10 10:00:00 +0000
categories: [kubernetes, devsecops]
image: "https://images.unsplash.com/photo-1667372333374-0d3c126ed2a0?auto=format&fit=crop&w=1200&q=80"
description: "Break down the internal flow of the Control Plane and Worker Nodes to understand K8s networking."
---

When working with Kubernetes at scale, understanding how Pods are connected is more important than memorizing Service types. Once you see how Kubernetes routes traffic and resolves names internally, production troubleshooting becomes intuitive.

## The Architecture: Brains vs. Muscles



### **The Control Plane: The Brain 🧠**
The control plane oversees the entire cluster's decision-making process.

* **API Server (api)**: The front desk of Kubernetes. Every interaction goes through here for validation.
* **Controller Manager (c-m)**: The automation genius that ensures the current state matches your desired state.
* **Scheduler (sched)**: Optimal placement expert. It finds the best worker node for new pods based on affinity and resources.
* **etcd**: The cluster's memory. A consistent key-value store holding the entire state of the cluster.

### **The Worker Node: The Muscles 💪**
Worker nodes do the actual heavy lifting of running your application code.

* **kubelet**: The node's manager. It ensures containers inside pods are healthy and following API server orders.
* **Kube-proxy (k-proxy)**: The networking lead. It manages `iptables` rules so pods can communicate internally and externally.
* **Container Runtime**: Usually `containerd`, this keeps your apps alive and isolated.

<figure class="post-image-container">
  <img src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/2bcc3e6c-6038-46c1-b783-3d2661de3944/2.png?t=1768636642" alt="Kubernetes Control Plane and Worker Node Interaction">
  <figcaption>Figure 1: Internal Component Interaction Flow</figcaption>
</figure>

## How Kubernetes Schedules Pods

Before networking starts, Kubernetes focuses on getting the Pod running. The sequence is a coordinated dance between the control plane and the kubelet.



1. **Storage**: Pod definition is stored in the API Server.
2. **Watch**: The Scheduler watches for unassigned Pods.
3. **Selection**: A node is selected based on constraints.
4. **Binding**: The Pod state is updated in the API Server with the assigned node.
5. **Execution**: The `kubelet` on the assigned node takes over.
6. **Initialization**: `kubelet` instructs the runtime to start containers.

<figure class="post-image-container">
  <img src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/8814ec44-53a9-4e8f-b414-cb9082851768/3.png?t=1768636647" alt="Pod Deployment Lifecycle">
  <figcaption>Figure 2: The Step-by-Step Scheduling Lifecycle</figcaption>
</figure>

> **Key Takeaway**: Understanding this internal flow is the foundation for mastering how Kubernetes connects Pods using Services and DNS. If the Control Plane can't talk to the Worker, your Services will never resolve.