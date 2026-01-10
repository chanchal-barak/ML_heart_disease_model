import pandas as pd
import numpy as np
import seaborn as sns
import os
import joblib
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    ConfusionMatrixDisplay,
    roc_curve,
    auc
)

os.makedirs("figures", exist_ok=True)
columns = [
    "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
    "thalach", "exang", "oldpeak", "slope", "ca", "thal", "target"
]

data = pd.read_csv(
    "processed.cleveland.data",
    names=columns
)

data.replace("?", np.nan, inplace=True)
data = data.astype(float)
data = data.fillna(data.mean())

data["target"] = data["target"].apply(lambda x: 1 if x > 0 else 0)

data.to_csv("heart.csv", index=False)

X = data.drop("target", axis=1)
y = data["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "SVM": SVC(kernel="rbf", probability=True),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42)
}
results = {}

print("\nMODEL PERFORMANCE\n")

for name, model in models.items():
    model.fit(X_train, y_train)
    preds = model.predict(X_test)

    results[name] = {
        "accuracy": accuracy_score(y_test, preds),
        "precision": precision_score(y_test, preds),
        "recall": recall_score(y_test, preds),
        "f1": f1_score(y_test, preds)
    }

    print(f"{name}")
    print(" Accuracy :", results[name]["accuracy"])
    print(" Precision:", results[name]["precision"])
    print(" Recall   :", results[name]["recall"])
    print(" F1-score :", results[name]["f1"])
    print("-" * 40)
rf = models["Random Forest"]

joblib.dump(rf, "heart_model.pkl")
joblib.dump(scaler, "scaler.pkl")

y_pred = rf.predict(X_test)

cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm)

disp.plot(cmap="Blues")
plt.title("Confusion Matrix – Heart Disease Prediction")
plt.savefig("figures/confusion_matrix.png", dpi=300, bbox_inches="tight")
plt.show()
y_prob = rf.predict_proba(X_test)[:, 1]

fpr, tpr, _ = roc_curve(y_test, y_prob)
roc_auc = auc(fpr, tpr)

plt.figure()
plt.plot(fpr, tpr, label=f"ROC Curve (AUC = {roc_auc:.2f})")
plt.plot([0, 1], [0, 1], linestyle="--")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve – Heart Disease Prediction")
plt.legend()
plt.savefig("figures/roc_curve.png", dpi=300, bbox_inches="tight")
plt.show()

plt.figure()
plt.bar(results.keys(), [v["accuracy"] for v in results.values()])
plt.ylabel("Accuracy")
plt.title("Accuracy Comparison of Machine Learning Models")
plt.ylim(0.7, 1.0)
plt.savefig("figures/model_accuracy_comparison.png", dpi=300, bbox_inches="tight")
plt.show()

feature_importance = rf.feature_importances_
features = X.columns

importance_df = pd.DataFrame({
    "Feature": features,
    "Importance": feature_importance
}).sort_values(by="Importance", ascending=False)

plt.figure(figsize=(8, 5))
plt.barh(importance_df["Feature"], importance_df["Importance"])
plt.xlabel("Importance Score")
plt.title("Feature Importance – Random Forest")
plt.gca().invert_yaxis()
plt.savefig("figures/feature_importance.png", dpi=300, bbox_inches="tight")
plt.show()

plt.figure(figsize=(6, 8))
corr = data.corr()
target_corr = corr[["target"]].sort_values(by="target", ascending=False)

sns.heatmap(
    target_corr,
    annot=True,
    cmap="coolwarm",
    linewidths=0.5
)

plt.title("Feature Correlation with Target")
plt.savefig("figures/target_correlation_heatmap.png", dpi=300, bbox_inches="tight")
plt.show()


plt.figure(figsize=(7, 5))
plt.scatter(
    data["age"],
    data["thalach"],
    c=data["target"],
    alpha=0.7
)
plt.xlabel("Age")
plt.ylabel("Max Heart Rate (thalach)")
plt.title("Age vs Max Heart Rate")
plt.colorbar(label="Target (0 = No Disease, 1 = Disease)")
plt.savefig("figures/scatter_age_thalach.png", dpi=300, bbox_inches="tight")
plt.show()

plt.figure(figsize=(12, 6))
plt.boxplot(X_train, vert=False)
plt.yticks(range(1, len(X.columns) + 1), X.columns)
plt.title("Box Plot of Scaled Features")
plt.savefig("figures/boxplot_all_features.png", dpi=300, bbox_inches="tight")
plt.show()


print("\nAll models trained and figures saved successfully.")
