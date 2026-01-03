# Feature: Live Timing System with Personal Stats Dashboard

## Overview
This PR introduces a comprehensive live timing system for race events, allowing real-time viewing of class results, PAX standings, raw times, work/run assignments, and a personalized "Me" dashboard. The implementation includes extensive refactoring to ensure maintainable, DRY, and performant code.

## 🎯 New Features

### Live Timing Pages

#### 1. **Class Results** (`/live`)
- Displays results grouped by car class
- Supports both autocross and rallycross display modes
- Interactive class filtering with URL-persisted state
- Expandable run details showing individual run times, cones, and DNFs
- Visual gap display showing position relative to other drivers
- Highlights PAX leaders

#### 2. **PAX Results** (`/live/pax`)
- PAX-adjusted standings across all classes
- Shows PAX time, raw time, and gaps to first/next
- Visual gap visualization for easy comparison

#### 3. **Raw Results** (`/live/raw`)
- Raw time standings across all drivers
- Position, total time, and gap information
- Consistent visual design with other result pages

#### 4. **Work/Run Order** (`/live/workrun`)
- Displays work and run assignments by class
- Shows number of heats for the event
- Only available on the day of the event
- Clear instructions for multi-heat events

#### 5. **Personal Stats Dashboard** (`/live/me`) ⭐
- **Driver Selection**: Searchable dropdown to select yourself
- **Position Cards**:
  - Class position with best time
  - PAX position and time
  - Raw position and time
- **Run Statistics**: Total runs, clean runs, cone count, DNF count
- **Visualizations**:
  - Class times distribution chart (horizontal histogram)
  - Individual class times visualization
- **URL-based persistence**: Driver selection stored in URL search params (encoded)
- **Responsive design**: Optimized for both mobile and desktop

### Shared Components & Features

- **Gap Visualization**: Visual timeline showing driver position relative to others
- **Result Cards**: Consistent card-based layout across all result types
- **Refresh Button**: Manual refresh capability in navigation
- **Empty States**: User-friendly messages when no data is available
- **Responsive Design**: Mobile-first approach with desktop optimizations

## 🏗️ Architecture

### Data Flow
- **Server-side data fetching**: All results fetched in parallel on the server
- **React Context**: `LiveResultsProvider` provides data to all client components
- **Custom Hooks**: 
  - `useLiveData()` - Access to all live results data and utilities
  - `useUrlFilters()` - URL search param management

### State Management
- **URL Search Params**: Used for class filters and driver selection (shareable/bookmarkable)
- **React Context**: Global state for live results data
- **Local State**: Component-specific UI state (expanded runs, etc.)

### API Integration
- Fetches from external live timing API endpoints
- Supports autocross and rallycross modes
- Handles missing/null data gracefully

## 🔧 Refactoring & Code Quality

### Code Consolidation
- **Merged duplicate components**: Combined `AutocrossResultEntry` and `RallycrossResultEntry` into unified `ClassResultEntry`
- **Extracted shared utilities**:
  - `utils/gap-calculator.ts` - Gap calculation logic
  - `utils/key-generators.ts` - Consistent React key generation
- **Created reusable components**:
  - `FilterButtons` - Shared filter button component
  - Various shared UI components (PositionBadge, DriverInfo, TimeValue, etc.)

### Custom Hooks
- **`useUrlFilters`**: Centralized URL search param management
- **`useLiveData`**: Improved with internal utility functions (non-exported)
- Better memoization with granular dependencies

### Performance Optimizations
- Memoized context values to prevent unnecessary re-renders
- Optimized gap calculations with `useMemo`
- Efficient key generation for React lists

### Simplified Architecture
- Removed unnecessary `PageWrapper` component
- Simplified all `page.tsx` files to directly export components
- Moved layout concerns to `LiveLayoutClient`

## 📁 File Structure

### New Directories
```
live/
├── api/              # Data fetching functions
├── components/       # React components
│   ├── class-results/
│   ├── my-stats/
│   ├── pax-results/
│   ├── raw-results/
│   ├── shared/
│   └── work-run/
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utilities and configuration
├── utils/            # Pure utility functions
├── me/               # Personal stats page
├── pax/              # PAX results page
├── raw/              # Raw results page
└── workrun/          # Work/run order page
```

## 📊 Statistics

- **67 files changed**
- **3,672 insertions**, 4 deletions
- **50+ new components** created
- **5 new pages** added
- **2 custom hooks** created
- **3 utility modules** extracted

## 🎨 UI/UX Features

### Visual Elements
- **Gap Timeline**: Visual representation of time gaps with car icons
- **Position Badges**: Clear position indicators
- **Color-coded drivers**: Car colors displayed consistently
- **Interactive cards**: Expandable run details
- **Responsive grids**: Adapts to screen size

### User Experience
- **Shareable URLs**: Filter states and driver selection in URL
- **Smooth transitions**: React transitions for URL updates
- **Loading states**: Refresh button with spinner
- **Empty states**: Helpful messages when no data
- **Mobile-optimized**: Touch-friendly interface

## 🔄 Related Changes

### Database
- Added migration for organization updates
- New fields for MSR integration

### MSR Integration
- Enhanced organization service
- Updated DTOs and repositories
- Test utilities added

### UI Components
- Enhanced Badge component
- New shared components library

## 🧪 Testing Considerations

- [x] All result pages render correctly
- [x] Class filtering works with URL persistence
- [x] Driver selection persists in URL
- [x] Gap visualizations display correctly
- [x] Work/run order shows only on event day
- [x] Responsive design works on mobile/desktop
- [x] Refresh functionality works
- [x] Empty states display appropriately
- [x] Both autocross and rallycross modes work

## 🚀 Migration Notes

### For Users
- New navigation item "Live" appears in tenant navigation
- All existing functionality remains unchanged
- No breaking changes to existing features

### For Developers
- New live timing API endpoints must be configured
- Context provider wraps all live timing pages
- Server-side data fetching in layout component

## 📝 Technical Details

### Dependencies
- `recharts` - Added for data visualization
- Existing Next.js, React, Tailwind CSS stack

### Browser Support
- Modern browsers with ES6+ support
- URL search params API
- CSS Grid and Flexbox

### Performance
- Server-side rendering for initial load
- Client-side hydration for interactivity
- Memoized calculations prevent unnecessary re-renders
- Efficient React key generation

## 🎯 Future Enhancements

Potential improvements for future PRs:
- Real-time updates via WebSocket
- Historical data comparison
- Export functionality
- Additional chart types
- Performance metrics dashboard

---

**Note**: This PR represents a significant feature addition with extensive refactoring. All changes maintain backward compatibility and follow established patterns in the codebase.
