---
layout: post
title: "Distroless Container Security"
date: 2026-02-14 14:00:00 +0000
categories: devsecops
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80"
description: "Reduce your attack surface by removing shells and package managers from your images."
---

## Small is Secure
A standard Ubuntu-based container has over 100 vulnerabilities out of the box. A distroless image has nearly zero.

## The Switch
Replace your `FROM alpine` or `FROM ubuntu` with `FROM gcr.io/distroless/static`.

## Why?
Attackers can't use `curl` or `apt-get` inside your container if those binaries don't exist. You effectively blind the intruder.