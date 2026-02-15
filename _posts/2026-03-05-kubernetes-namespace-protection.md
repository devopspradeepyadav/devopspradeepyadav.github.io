---
layout: post
title: "Protecting Kubernetes using Namespaces"
date: 2026-02-15 10:00:00 +0000
categories: [kubernetes, devsecops]
image: "https://images.unsplash.com/photo-1667372333374-0d3c126ed2a0?auto=format&fit=crop&w=1200&q=80"
description: "Namespaces protect workloads and teams from each other. Here is how to implement them correctly."
---

## Namespaces vs cgroups

Before we talk about protecting Kubernetes using namespaces, we need to clear up a confusion that trips up even experienced DevOps engineers. Namespaces and cgroups solve two very different problems.



* **Namespaces** answer the question: **What can I see?** They isolate views of the system—processes, network interfaces, mounts, users, and hostnames. A container sees only what its namespace exposes.
* **cgroups** answer the question: **How much can I use?** They limit and account for CPU, memory, disk IO, and PIDs.

Kubernetes builds on both, but when we talk about **protecting Kubernetes**, we are mostly talking about controlling visibility and access. That is a namespace problem, not a cgroup problem.

<figure class="post-image-container">
  <img src="https://media.beehiiv.com/uploads/asset/file/df051536-0013-4cfe-b15c-6196b553efad/2.gif?t=1770702711" alt="Container Isolation Logic">
  <figcaption>Visualization: Namespace Isolation vs Resource Cgroups</figcaption>
</figure>

## How Namespaces Protect a Cluster

Namespaces create logical boundaries inside a shared cluster. They do not isolate nodes or the kernel; they isolate **access and visibility**. They scope resources like Pods, Services, ConfigMaps, Secrets, RBAC permissions, and Network policies.



### **The Implementation Workflow**

1.  **Step 1: Define Roles (Role or ClusterRole)**: Define what actions are allowed within a namespace or across the entire cluster.
2.  **Step 2: Create Service Accounts or Users/Groups**: Set up identities within Kubernetes or manage external users to take on these roles.
3.  **Step 3: Bind Roles to Accounts**: Use `RoleBindings` to connect roles to service accounts or users within a namespace.

## Key RBAC Roles in Kubernetes

To understand how this operates, we must break down the key roles:

* **Cluster-admin**: A superuser with full control over all resources across the cluster and namespaces.
* **Admin**: Grants complete read/write access within a specific namespace, including creating roles and bindings.
* **Edit**: Allows read/write permissions within a namespace, excluding the ability to view or modify roles.
* **View**: Provides read-only access within a namespace.

> **The Core Idea:** cgroups protect the **node** from containers, while namespaces protect **workloads and teams** from each other.