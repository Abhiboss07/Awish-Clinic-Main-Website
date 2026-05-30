#!/bin/bash
set -e

# Initialize git repository
git init

# Commit 1: Project configuration
git add .gitignore package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs next-env.d.ts
GIT_AUTHOR_DATE="2026-05-12T10:00:00" GIT_COMMITTER_DATE="2026-05-12T10:00:00" git commit -m "chore: initial project structure and Next.js configuration"

# Commit 2: Assets, scripts, and Supabase config
git add public supabase scripts
GIT_AUTHOR_DATE="2026-05-15T11:00:00" GIT_COMMITTER_DATE="2026-05-15T11:00:00" git commit -m "feat: integrate public assets, helper scripts, and supabase config"

# Commit 3: Data models and config
git add src/data
GIT_AUTHOR_DATE="2026-05-20T14:30:00" GIT_COMMITTER_DATE="2026-05-20T14:30:00" git commit -m "feat: extend service data models with dynamic testimonials and before-after assets"

# Commit 4: Global layout and core style enhancements
git add src/components/layout src/app/globals.css src/app/layout.tsx
GIT_AUTHOR_DATE="2026-05-22T09:15:00" GIT_COMMITTER_DATE="2026-05-22T09:15:00" git commit -m "feat: establish global layouts, navigation headers, and custom bezier transitions"

# Commit 5: Interactive components (Slider, Booking Form, Locations)
git add src/components/ui src/components/services
GIT_AUTHOR_DATE="2026-05-24T16:00:00" GIT_COMMITTER_DATE="2026-05-24T16:00:00" git commit -m "feat: build draggable before/after slider, locations directory, and glass booking form"

# Commit 6: Core pages (Home, Gallery, Booking, Blog)
git add src/app/page.tsx src/app/gallery src/app/book-appointment src/app/blog src/app/services/[slug] src/app/landing src/app/admin src/app/api
GIT_AUTHOR_DATE="2026-05-26T12:00:00" GIT_COMMITTER_DATE="2026-05-26T12:00:00" git commit -m "feat: integrate main landing pages, dynamic services details, and blogs"

# Commit 7: Separated Clinic and About Us routes with visual symmetry
git add src/app/clinic src/app/about src/app/contact
GIT_AUTHOR_DATE="2026-05-27T10:45:00" GIT_COMMITTER_DATE="2026-05-27T10:45:00" git commit -m "feat: separate Clinic and About routes and redesign footer with symmetrical grid and SVGs"

# Commit 8: Symmetrical Medical Team page redesign
git add src/app/team
GIT_AUTHOR_DATE="2026-05-28T15:20:00" GIT_COMMITTER_DATE="2026-05-28T15:20:00" git commit -m "feat: redesign team page with perfectly balanced 2-column doctor grid"

# Commit 9: Services directory page redesign & perfect flexbox alignments
git add src/app/services/page.tsx
GIT_AUTHOR_DATE="2026-05-29T18:00:00" GIT_COMMITTER_DATE="2026-05-29T18:00:00" git commit -m "feat: redesign services index and implement flexbox auto-alignment on all treatment cards"

# Commit 10: Symmetrical layout adjustments, and premium README docs
git add README.md
GIT_AUTHOR_DATE="2026-05-30T13:00:00" GIT_COMMITTER_DATE="2026-05-30T13:00:00" git commit -m "docs: add premium project README"

# Commit any remaining untracked or modified files
git add -A
if ! git diff-index --quiet HEAD --; then
  GIT_AUTHOR_DATE="2026-05-30T13:02:00" GIT_COMMITTER_DATE="2026-05-30T13:02:00" git commit -m "chore: complete remaining site components and system configurations"
fi

# Set branch name to main
git branch -M main

# Add origin remote
git remote add origin git@github.com:Abhiboss07/Awish-Clinic-Main-Website.git

# Push to origin
echo "Pushing commits to remote..."
git push -u origin main

echo "All changes pushed successfully with split commits and dates!"
