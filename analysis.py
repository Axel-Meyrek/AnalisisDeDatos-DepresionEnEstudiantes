import pandas as pd
import json

def analyze_data():
    # Load the dataset
    df = pd.read_csv('Data.csv')
    
    # Clean data
    df['Depression'] = df['Depression'].astype(str).str.upper().map({'TRUE': True, 'FALSE': False, '1': True, '0': False, '1.0': True, '0.0': False})
    df['Depression'] = df['Depression'].fillna(False)

    numeric_cols = ['Age', 'CGPA', 'Sleep_Duration', 'Study_Hours', 'Social_Media_Hours', 'Physical_Activity', 'Stress_Level']
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # 1. KPIs
    total_students = len(df)
    depression_count = int(df['Depression'].sum())
    depression_rate = (depression_count / total_students) * 100
    avg_age = df['Age'].mean()
    avg_cgpa = df['CGPA'].mean()

    # 2. Pie Distribution: Healthy vs Probable
    dist_counts = df['Depression'].value_counts().to_dict()
    depression_dist = {
        "Saludable": int(dist_counts.get(False, 0)),
        "Depresión Probable": int(dist_counts.get(True, 0))
    }

    # 3. Lifestyle Factors Comparison (Transposed for easier JS access)
    lifestyle_factors = ['Sleep_Duration', 'Study_Hours', 'Social_Media_Hours', 'Physical_Activity']
    lifestyle_comp_raw = df.groupby('Depression')[lifestyle_factors].mean().transpose().to_dict()
    # Convert bool keys to strings
    lifestyle_comp = {str(k).lower(): v for k, v in lifestyle_comp_raw.items()}

    # 4. Correlation Matrix
    corr_matrix = df[numeric_cols].corr().to_dict()

    # 5. Dept & Gender Analysis
    dept_gender = df.groupby(['Department', 'Gender'])['Depression'].mean() * 100
    dept_gender_data = dept_gender.unstack().to_dict()

    # 6. Stress Analysis
    stress_dist = df.groupby(['Stress_Level', 'Depression']).size().unstack(fill_value=0)
    stress_dist_pct = (stress_dist.div(stress_dist.sum(axis=1), axis=0) * 100)
    # Convert columns to string labels
    stress_dist_pct.columns = [str(c).lower() for c in stress_dist_pct.columns]
    stress_dist_pct_dict = stress_dist_pct.transpose().to_dict()
    
    stress_avg = df.groupby('Depression')['Stress_Level'].mean().to_dict()
    stress_avg_str = {str(k).lower(): v for k, v in stress_avg.items()}

    # Legacy & Comparison Profile
    profiles_raw = df.groupby('Depression')[numeric_cols].mean().transpose().to_dict()
    profiles = {str(k).lower(): v for k, v in profiles_raw.items()}
    
    dept_stats = (df.groupby('Department')['Depression'].mean() * 100).sort_values(ascending=False).to_dict()
    
    bins = [0, 4, 6, 8, 10, 24]
    labels = ['<4h', '4-6h', '6-8h', '8-10h', '>10h']
    df['Sleep_Bin'] = pd.cut(df['Sleep_Duration'], bins=bins, labels=labels)
    sleep_stats = (df.groupby('Sleep_Bin', observed=True)['Depression'].mean() * 100).to_dict()

    summary = {
        "overview": {
            "total_students": total_students,
            "depression_count": depression_count,
            "depression_rate": round(depression_rate, 2),
            "avg_age": round(avg_age, 2),
            "avg_cgpa": round(avg_cgpa, 2)
        },
        "depression_distribution": depression_dist,
        "lifestyle_comparison": lifestyle_comp,
        "correlation_matrix": corr_matrix,
        "dept_gender_analysis": dept_gender_data,
        "stress_analysis": {
            "distribution": stress_dist_pct_dict,
            "averages": stress_avg_str
        },
        "department_analysis": dept_stats,
        "sleep_analysis": sleep_stats,
        "profiles": profiles
    }

    with open('data.js', 'w') as f:
        f.write("const DASHBOARD_DATA = ")
        json.dump(summary, f, indent=4)
        f.write(";")
    
    print("Analysis complete. data.js generated with correctly keyed metrics.")

if __name__ == "__main__":
    analyze_data()
