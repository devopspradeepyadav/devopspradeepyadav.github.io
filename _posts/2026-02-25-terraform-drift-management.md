---
layout: post
title: "Terraform Drift Management"
date: 2026-02-15 08:00:00 +0000
categories: terraform
image: "https://images.unsplash.com/photo-1618401471353-b98aadebc25a?auto=format&fit=crop&w=1200&q=80"
description: "Detecting and fixing manual changes in your infrastructure using terraform plan."
---

## The Danger of Manual Edits
Infrastructure drift occurs when someone makes a "quick fix" in the AWS Console. This breaks the source of truth.

## Detection
Run a daily `terraform plan -detailed-exitcode`. If the code is `2`, drift has occurred.

## Recovery
1. **Import**: Use `terraform import` to bring manual resources back into code.
2. **Re-Apply**: Force the state back to the desired configuration defined in your `.tf` files.