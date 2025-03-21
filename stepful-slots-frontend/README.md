### Frontend (Next.js)

### Setup
1. **cd into frontend repo**
```bash
cd stepful-slots-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Navigate to http://localhost:4000**

5. **Select User (Top Left)**

### Key Features
- Interactive calendar view for slot management
- Role-based user flows:
  - **Students**: view & book available slots, see coach details on booked slots
  - **Coaches**: view/create slots and leave satisfaction scores & notes for past booked appointments
- Pessimistic ui updates after booking or submitting feedback
- centralized API calls
- Styled with Material-UI

### Decisions
- Resused same components for students/coaches with conditional rendering
- Most state is managed at the parent level and propegated down
- 

### Future improvement
- logic can be simplified by creating different components for each view version (depending on role)
- add better error handling/reporting
- implement more frontend validation
