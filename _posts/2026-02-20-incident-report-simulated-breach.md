---
layout: post
title: "Incident Report: Simulated Breach"
date: 2026-02-3 09:00:00 +0000
categories: devsecops
image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
description: "A detailed post-mortem of a simulated lateral movement attack and how we patched the IAM policy."
---

## Incident Overview
During a scheduled Red Team exercise, a "leaked" access key allowed lateral movement from a dev bucket to a production database.

## Root Cause
The IAM policy for the development user was overly permissive (`s3:*` on all resources).

## Remediation
1. **Principle of Least Privilege**: Restricted access to specific ARNs only.
2. **MFA Enforcement**: Required multi-factor authentication for all production-level API calls.