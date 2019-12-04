import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, IconButton, TextField, Link, FormHelperText, Checkbox, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import api from "../../services/api";

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  cpf: {
    presence: { allowEmpty: false, message: "is required" }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  },
  birthDate: {
    presence: { allowEmpty: false, message: "is required" }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  policyCheckbox: {
    marginLeft: "-14px"
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    birthDate: "",
    removed: 0
  });

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = async event => {
    event.preventDefault();
    setFormState({
      ...formState,
      birthDate: moment(formState.birthDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    });

    await api.endpoints.addUsers(formState);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Seja bem-vindo(a) ao WebContas!
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.quoteText} variant="h4">
                  Se já possui cadastro, clique no botão abaixo para acessar sua conta.
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignUp}>
                <Typography className={classes.title} variant="h2">
                  Criar uma conta
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Preencha seus dados abaixo
                </Typography>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Nome"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={formState.name || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="CPF"
                  name="cpf"
                  onChange={handleChange}
                  type="text"
                  value={formState.cpf || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="E-mail"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.email || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Senha"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.password || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Data de Nascimento"
                  name="birthDate"
                  onChange={handleChange}
                  type="text"
                  value={formState.birthDate || ""}
                  variant="outlined"
                />
                <Button className={classes.signUpButton} color="primary" fullWidth size="large" type="submit" variant="contained">
                  Cadastrar-se
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Já tem uma conta?{" "}
                  <Link component={RouterLink} to="/sign-in" variant="h6">
                    Fazer Login
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
