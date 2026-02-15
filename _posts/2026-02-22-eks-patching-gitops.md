---
layout: post
title: "EKS Patching via GitOps"
date: 2026-02-2 10:00:00 +0000
categories: kubernetes
image: "https://images.unsplash.com/photo-1667372333374-0d3c126ed2a0?auto=format&fit=crop&w=1200&q=80"
description: "How to use ArgoCD to manage Amazon EKS version upgrades without downtime."
---

## Zero-Downtime Upgrades
Manual patching is a DevOps anti-pattern. By using ArgoCD, we ensure that our cluster state always matches our Git repository.

## Implementation
We use a **Blue-Green** node group strategy. We spin up a new node group on the latest version, migrate workloads, and then terminate the old group.

> **Pro Tip:** Always run a `pre-flight` check to ensure all deployments have proper PDBs (Pod Disruption Budgets).