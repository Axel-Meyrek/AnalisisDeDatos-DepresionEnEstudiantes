const DASHBOARD_DATA = {
    "overview": {
        "total_students": 100000,
        "depression_count": 10062,
        "depression_rate": 10.06,
        "avg_age": 21.01,
        "avg_cgpa": 2.9
    },
    "depression_distribution": {
        "Saludable": 89938,
        "Depresi\u00f3n Probable": 10062
    },
    "lifestyle_comparison": {
        "false": {
            "Sleep_Duration": 7.025262958927261,
            "Study_Hours": 4.520047143587805,
            "Social_Media_Hours": 3.494947630589962,
            "Physical_Activity": 74.55530476550513
        },
        "true": {
            "Sleep_Duration": 6.738660306102166,
            "Study_Hours": 4.415394553766647,
            "Social_Media_Hours": 3.577837408069966,
            "Physical_Activity": 72.54651162790698
        }
    },
    "correlation_matrix": {
        "Age": {
            "Age": 1.0,
            "CGPA": 0.0032483916395998594,
            "Sleep_Duration": 0.0013570173259777087,
            "Study_Hours": -0.003807805001255232,
            "Social_Media_Hours": -0.0004362875567826868,
            "Physical_Activity": -0.0036755447414752885,
            "Stress_Level": 0.0029990488532717708
        },
        "CGPA": {
            "Age": 0.0032483916395998594,
            "CGPA": 1.0,
            "Sleep_Duration": 0.015386431873260123,
            "Study_Hours": 0.0995340810241168,
            "Social_Media_Hours": -0.08799796499039417,
            "Physical_Activity": 0.0047657468072968175,
            "Stress_Level": -0.012287408875529154
        },
        "Sleep_Duration": {
            "Age": 0.0013570173259777087,
            "CGPA": 0.015386431873260123,
            "Sleep_Duration": 1.0,
            "Study_Hours": 0.0027435692555658493,
            "Social_Media_Hours": -0.0030080146256367952,
            "Physical_Activity": 0.0031658456181631327,
            "Stress_Level": -0.2814086695256948
        },
        "Study_Hours": {
            "Age": -0.003807805001255232,
            "CGPA": 0.0995340810241168,
            "Sleep_Duration": 0.0027435692555658493,
            "Study_Hours": 1.0,
            "Social_Media_Hours": 0.005307917957438566,
            "Physical_Activity": -0.002045126176342828,
            "Stress_Level": 0.008731423824574437
        },
        "Social_Media_Hours": {
            "Age": -0.0004362875567826868,
            "CGPA": -0.08799796499039417,
            "Sleep_Duration": -0.0030080146256367952,
            "Study_Hours": 0.005307917957438566,
            "Social_Media_Hours": 1.0,
            "Physical_Activity": -0.004787905512300496,
            "Stress_Level": 0.0019410342826806303
        },
        "Physical_Activity": {
            "Age": -0.0036755447414752885,
            "CGPA": 0.0047657468072968175,
            "Sleep_Duration": 0.0031658456181631327,
            "Study_Hours": -0.002045126176342828,
            "Social_Media_Hours": -0.004787905512300496,
            "Physical_Activity": 1.0,
            "Stress_Level": -0.29652018020755094
        },
        "Stress_Level": {
            "Age": 0.0029990488532717708,
            "CGPA": -0.012287408875529154,
            "Sleep_Duration": -0.2814086695256948,
            "Study_Hours": 0.008731423824574437,
            "Social_Media_Hours": 0.0019410342826806303,
            "Physical_Activity": -0.29652018020755094,
            "Stress_Level": 1.0
        }
    },
    "dept_gender_analysis": {
        "Female": {
            "Arts": 10.092934945538124,
            "Business": 9.822866344605476,
            "Engineering": 10.112472384012854,
            "Medical": 9.706477732793523,
            "Science": 9.892068521635805
        },
        "Male": {
            "Arts": 10.209188269442498,
            "Business": 10.547423300581512,
            "Engineering": 10.030696108525596,
            "Medical": 10.194367314557715,
            "Science": 10.00802246289611
        }
    },
    "stress_analysis": {
        "distribution": {
            "2": {
                "false": 91.14855419027298,
                "true": 8.851445809727025
            },
            "3": {
                "false": 90.90708550251479,
                "true": 9.09291449748522
            },
            "4": {
                "false": 90.60276086770128,
                "true": 9.397239132298722
            },
            "5": {
                "false": 90.54026503567788,
                "true": 9.459734964322122
            },
            "6": {
                "false": 89.89959667038531,
                "true": 10.100403329614691
            },
            "7": {
                "false": 87.76053215077604,
                "true": 12.239467849223946
            },
            "8": {
                "false": 58.23373173970784,
                "true": 41.766268260292165
            },
            "9": {
                "false": 57.80590717299579,
                "true": 42.19409282700422
            },
            "10": {
                "false": 0.0,
                "true": 100.0
            }
        },
        "averages": {
            "false": 4.095521359158531,
            "true": 4.454680977936792
        }
    },
    "department_analysis": {
        "Business": 10.18583626318433,
        "Arts": 10.15101510151015,
        "Engineering": 10.071296804108291,
        "Medical": 9.952915247445402,
        "Science": 9.949678640825072
    },
    "sleep_analysis": {
        "<4h": 25.06908803789972,
        "4-6h": 11.106461332440576,
        "6-8h": 9.257085020242915,
        "8-10h": 9.132523567802755,
        ">10h": 8.780256288561937
    },
    "profiles": {
        "false": {
            "Age": 21.014176432653606,
            "CGPA": 2.9301766772665614,
            "Sleep_Duration": 7.025262958927261,
            "Study_Hours": 4.520047143587805,
            "Social_Media_Hours": 3.494947630589962,
            "Physical_Activity": 74.55530476550513,
            "Stress_Level": 4.095521359158531
        },
        "true": {
            "Age": 20.962830451202546,
            "CGPA": 2.6135301132975552,
            "Sleep_Duration": 6.738660306102166,
            "Study_Hours": 4.415394553766647,
            "Social_Media_Hours": 3.577837408069966,
            "Physical_Activity": 72.54651162790698,
            "Stress_Level": 4.454680977936792
        }
    }
};