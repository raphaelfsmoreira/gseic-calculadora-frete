console.log("Iniciando...");
console.log("Deu certo");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "http://localhost:3001";

app.get("/env.js", (req, res) => {
  res.type("application/javascript");
  res.send(`window.ENV = { API_URL: ${JSON.stringify(API_URL)} };`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/cdd", express.static(path.join(__dirname, "views/cdd")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "domestic-worker-secret-2025",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  }),
);


// ------------------ Rotas Time 14 - Frete ------------------------

function requireFreteAuth(req, res, next) {
  if (req.session && req.session.freteUser) {
    return next();
  }

  return res.redirect("/frete/login");
}

// Rota de Entrada. Redirecionamento ao Splash Screen.
app.get('/frete', (req, res) => {
    res.redirect("/frete/splash");
});

app.get("/frete/splash", (req, res) => {
  res.render("Time_14(Frete)/splash");
});

// Rota de Login
app.get("/frete/login", (req, res) => {
  if (req.session.freteUser) {
    return res.redirect("/frete/home");
  }

  return res.render("Time_14(Frete)/login", {
    error: null,
  });
});

app.post("/frete/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("Time_14(Frete)/login", {
      error: "Preencha usuário e senha.",
    });
  }

  if (username === "admin" && password === "1234") {
    req.session.freteUser = {
      username: "admin",
      nome: "Administrador Frete",
    };

    return res.redirect("/frete/home");
  }

  return res.render("Time_14(Frete)/login", {
    error: "Usuário ou senha inválidos.",
  });
});

app.get("/frete/home", requireFreteAuth, (req, res) => {
  res.render("Time_14(Frete)/home", {
    user: req.session.freteUser,
  });
});

app.get("/frete/logout", (req, res) => {
  req.session.freteUser = null;
  return res.redirect("/frete/login");
});

app.get("/frete/help", requireFreteAuth, (req, res) => {
  res.render("Time_14(Frete)/help", {
    user: req.session.freteUser,
  });
});

app.get("/frete/about", requireFreteAuth, (req, res) => {
  res.render("Time_14(Frete)/about", {
    user: req.session.freteUser,
  });
});

app.get("/frete/calcular", requireFreteAuth, async (req, res) => {
  try {
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(`${API_URL}/api/frete/tipos`);
    const data = await response.json();

    res.render("Time_14(Frete)/calcular", {
      user: req.session.freteUser,
      tiposFrete: data.data || [],
      resultado: null,
      error: null,
    });
  } catch (err) {
    res.render("Time_14(Frete)/calcular", {
      user: req.session.freteUser,
      tiposFrete: [],
      resultado: null,
      error: "Não foi possível carregar os tipos de frete.",
    });
  }
});

app.post("/frete/calcular", requireFreteAuth, async (req, res) => {
  try {
    const fetch = (await import("node-fetch")).default;

    const payload = {
      comprimento: Number.parseFloat(req.body.comprimento),
      largura: Number.parseFloat(req.body.largura),
      altura: Number.parseFloat(req.body.altura),
      pesoReal: Number.parseFloat(req.body.pesoReal),
      distanciaKm: Number.parseFloat(req.body.distanciaKm),
      tipoFrete: req.body.tipoFrete,
      valorDeclarado: Number.parseFloat(req.body.valorDeclarado),
      importado: req.body.importado === "on",
      segurado: req.body.segurado === "on",
    };

    const response = await fetch(`${API_URL}/api/frete/calcular`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`App Frete rodando em http://localhost:${PORT}`);
});

module.exports = app;