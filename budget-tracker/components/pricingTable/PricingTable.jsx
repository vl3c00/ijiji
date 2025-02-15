import React from "react";
import { Leaderboard, AccountTree, Schema, CheckCircle } from "@mui/icons-material";

const styles = {
  body: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  center: {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    flexDirection: "column",
  },
  title: {
    fontSize: "30px",
    marginBottom: "40px",
    marginTop: "20px",
  },
  spanHighlight: {
    background: "rgb(107, 216, 136)",
  },
  pricings: {
    width: "fit-content",
    height: "fit-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  pricing: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "270px",
    height: "360px",
    boxSizing: "border-box",
    padding: "25px",
    border: "0.5mm solid rgb(40, 40, 40)",
    margin: "15px",
    borderRadius: "1mm",
    transition: "0.25s",
    cursor: "pointer",
    color: "black",
    background: "white",
  },
  pricingHover: {
    boxShadow: "10px 10px 0 rgb(40, 40, 40)",
  },
  name: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: "500",
  },
  nameIcon: {
    fontSize: "22px",
    width: "35px",
    height: "35px",
    lineHeight: "35px",
    textAlign: "center",
    borderRadius: "50%",
    background: "rgba(40, 40, 40, 0.1)",
  },
  price: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "34px",
    fontWeight: "600",
  },
  priceSmallText: {
    fontSize: "12px",
    fontWeight: "400",
  },
  features: {
    marginTop: "10px",
  },
  feature: {
    fontSize: "13px",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
  },
  featureIcon: {
    fontSize: "16px",
    marginRight: "10px",
    color: "rgb(69, 172, 97)",
  },
  btns: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  button: {
    padding: "5px 15px",
    fontSize: "16px",
    background: "white",
    color: "black",
    border: "none",
    outline: "0.5mm solid rgb(40, 40, 40)",
    cursor: "pointer",
    transition: "background-color 0.25s ease, color 0.25s ease",
    textDecoration: "none",
  },
  buttonHover: {
    background: "black",
    color: "white",
  },
  link: {
    color: "rgb(17, 105, 194)",
    textDecoration: "underline",
    fontSize: "12px",
  },
};

function PricingPlans() {
  return (
    <div style={styles.center}>
      <div style={styles.title}>
        Choose the plan that <span style={styles.spanHighlight}>works for you</span>
      </div>
      <div style={styles.pricings}>
        {[  
          {
            id: "p1",
            name: "Starter",
            price: "$2.99",
            Icon: Leaderboard,
            features: [
              "Analysing income & expenses.",
              "Categorize spending.",
              "Basic financial summaries.",
              "Basic customer support.",
            ],
          },
          {
            id: "p2",
            name: "Basic",
            price: "$5.99",
            Icon: AccountTree,
            features: [
              "Smart insights on spending habits.",
              "Set & monitor savings goals.",
              "Cloud Storage – Up to 1GB for receipts & invoices",
              "Access from web & mobile",
              "Priority Email & Chat Support",
            ],
          },
          {
            id: "p3",
            name: "Premium",
            price: "$25.99", // Regular price
            Icon: Schema,
            link: "http://localhost:3001/",
            features: [
              "AI-Powered Smart Suggestions – Personalized financial advice",
              "AI-Powered Budget Forecasting",
              "Up to 10GB for receipts & invoices.",
              "Predict future finances",
              "Generate tax summaries.",
              "$5 for extra 50GB.",
            ],
            strikethrough: true, // Only for Premium plan
          },
        ].map((plan) => (
          <label
            key={plan.id}
            htmlFor={plan.id}
            style={styles.pricing}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.pricingHover.boxShadow)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div style={styles.name}>
              {plan.name} <plan.Icon style={styles.nameIcon} />
            </div>
            <div style={styles.price}>
              {plan.strikethrough ? (
                <span style={{ textDecoration: "line-through" }}>{plan.price}</span>
              ) : (
                plan.price
              )}
              <span style={styles.priceSmallText}>Per month</span>
            </div>
            <div style={styles.features}>
              {plan.features.map((feature, index) => (
                <div key={index} style={styles.feature}>
                  <CheckCircle style={styles.featureIcon} />
                  {feature}
                </div>
              ))}
            </div>
            <div style={styles.btns}>
              <a
                href={plan.link}
                target="_blank"  // Open in a new tab
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = styles.buttonHover.background;
                  e.currentTarget.style.color = styles.buttonHover.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = styles.button.background;
                  e.currentTarget.style.color = styles.button.color;
                }}
              >
                Get Started
              </a>
              <a href="#" style={styles.link}>
                Know More
              </a>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PricingPlans;
