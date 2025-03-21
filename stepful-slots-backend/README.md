## Backend (Rails API)
1. **cd into backend repo**
```bash
cd stepful-slots-backend
```

2. **Install dependencies**
```bash
bundle install
```

3. **Database Setup**
```bash
rails db:create
rails db:migrate
rails db:seed
```

4. **Start the server**
```bash
rails s
```

### Features
- RESTful API for Users and Slots
    - list all users
    - list all slots for user (with additional available slots for students)
    - update a slots notes/satisfaction score (coach only)
    - book a slot (student only)
- Strong parameter validation and eager loading
- Models with validations
- PostgreSQL

### Decision
- Metadata on slots is fairly light (notes/score) so did not split this into its own model referencing slots
- Since there's a singular calendar view, created dynamic index for student and coaches slots

### Future Features
- increase validation coverage
    - phone number format
    - note length
    - slot start time logic (one one uniq start time/no overlap)
- split endpoints for students and coaches slots