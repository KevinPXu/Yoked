# Yoked

[![](https://img.shields.io/static/v1?label=License&message=MIT&color=<yellow>)](https://opensource.org/licenses/MIT)

[Deployed Application](https://young-headland-04692.herokuapp.com/)

## Description

This repostiory contains a full-stack application meant to function as a workout companion. Yoked uses MongoDB to host a database of different exercises and workout templates, which users can either use directly or draw from to create custom workouts. Users are able to create an account, log in, and save their own workout templates to track progress. Material UI provides a polished and approachable interface.

---

## Usage

Create an account or log in to begin. Once logged in, the user will be directed first to a templates page, where there will be several pre-made workout templates to choose from. To create a new, custom workout template, click the 'Create Template' button, and a modal will appear that prompts the user to enter a name, select exercises, and designate a number of sets and reps (and weight, if applicable) for the exercises. Once created, the user's template will appear alongside the default templates. On click, templates will display the exercises, sets, and reps associated with that workout in a modal for the user.

---

## Deployed Link

## https://young-headland-04692.herokuapp.com/

## Technologies Used

- React.js
- Material UI
- Calender Components
- Node.js
- MongoDB
- Mongoose ODM
- GraphQL
- Apollo Server/Client
- JWT
- Bcrypt

---

## Code Snippet

### User Model example requiring all other models

```JavaScript
{
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        templates: [
            {
                type: Schema.Types.ObjectId,
                ref: 'template'
            }
        ],
        exercises: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exerciseType'
            }
        ],
        bodyParts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'bodyPart'
            }
        ],
        history: [
            {
                type: Schema.Types.ObjectId,
                ref: 'history'
            }
        ],
        loggedIn: {
            type: Boolean,
            required: true
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);
```

---

### code example Material UI usage

```JSX
<ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          sx={{ backgroundColor: '#a9d1db' }}>
          <Toolbar>
            <Nav />
            <Typography
              variant='h5'
              component='div'
              color='neutral'
              sx={{ flexGrow: 1, color: '#161616' }}>
              Yoked
            </Typography>
            <img
              src='EggLogo.png'
              alt='EggLogo'
              width='50'
              height='50'></img>
            <Button
              component={RouterLink}
              style={{ color: '#161616' }}
              to='/signup'>
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
```

## Contributors

Joe Jensen &#124; [GitHub](https://github.com/joedjensen) &#124; [LinkedIn](https://www.linkedin.com/in/joseph-jensen-5a150b91/)  
Bradley DiLollo &#124; [GitHub](https://github.com/bdilollo) &#124; [LinkedIn](https://www.linkedin.com/in/bradley-dilollo/)  
Kevin Xu &#124; [GitHub](https://github.com/KevinPXu) &#124; [LinkedIn](https://www.linkedin.com/in/kevin-xu-4672a7215/)  
Preston Ramsey &#124; [GitHub](https://github.com/PRamsey02) &#124; [LinkedIn](https://www.linkedin.com/in/preston-ramsey-354ab5244/)
