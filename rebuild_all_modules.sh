#!/bin/bash

echo "Memulai proses rebuild semua modul AI lanjutan..."

# Array modul yang akan direbuild. Format: "Path Markdown|ID Modul|Kategori Folder|Modul Folder"
MODULES=(
    # Foundation Core AI
    "nazril/modul-materi-herai (1)/modul-materi-herai/foundation-core-ai/Modul_Reinforcement_Learning_HerAI.md|ai-reinforcement-learning|foundation-core-ai|reinforcement-learning"
    
    # Data Engineering Domains
    "nazril/modul-materi-herai (1)/modul-materi-herai/data-engineering-domain/Modul_Data_Science_HerAI.md|ai-data-science|data-engineering-domains|data-science"
    "nazril/modul-materi-herai (1)/modul-materi-herai/data-engineering-domain/Modul_Data_Engineering_HerAI.md|ai-data-engineering|data-engineering-domains|data-engineering"
    "nazril/modul-materi-herai (1)/modul-materi-herai/data-engineering-domain/Modul_Infrastructure_for_AI_HerAI.md|ai-infrastructure|data-engineering-domains|infrastructure"
    "nazril/modul-materi-herai (1)/modul-materi-herai/data-engineering-domain/Modul_Back_End_Development_for_AI_HerAI.md|ai-back-end|data-engineering-domains|back-end"
    "nazril/modul-materi-herai (1)/modul-materi-herai/data-engineering-domain/Modul_Front_End_Development_for_AI_HerAI.md|ai-front-end|data-engineering-domains|front-end"
    "nazril/modul-materi-herai (1)/modul-materi-herai/data-engineering-domain/Modul_AI_Deployment_HerAI.md|ai-deployment|data-engineering-domains|deployment"
    "nazril/modul-materi-herai (1)/modul-materi-herai/data-engineering-domain/Modul_Bioinformatics_and_AI_HerAI.md|ai-bioinformatics|data-engineering-domains|bioinformatics"
    
    # Generative Multimodal AI
    "nazril/modul-materi-herai (1)/modul-materi-herai/generative-multimodal-ai/Modul_Large_Language_Model_HerAI.md|ai-large-language-model|generative-multimodal-ai|large-language-model"
    "nazril/modul-materi-herai (1)/modul-materi-herai/generative-multimodal-ai/Modul_Vision_Language_Model_HerAI.md|ai-vlm|generative-multimodal-ai|vlm"
    "nazril/modul-materi-herai (1)/modul-materi-herai/generative-multimodal-ai/Modul_Multimodal_Large_Language_Model_HerAI.md|ai-multimodal-llm|generative-multimodal-ai|multimodal-llm"
    "nazril/modul-materi-herai (1)/modul-materi-herai/generative-multimodal-ai/Modul_Agentic_AI_HerAI.md|ai-agentic-ai|generative-multimodal-ai|agentic-ai"
    
    # Business Industry Application
    "nazril/modul-materi-herai (1)/modul-materi-herai/business-industry-application/Modul_UI_UX_Design_Thinking_HerAI.md|ai-ui-ux|business-industry-applications|ui-ux"
    "nazril/modul-materi-herai (1)/modul-materi-herai/business-industry-application/Modul_Business_Insight_HerAI.md|ai-business-insight|business-industry-applications|business-insight"
    "nazril/modul-materi-herai (1)/modul-materi-herai/business-industry-application/Modul_People_and_Business_Management_HerAI.md|ai-people-business-mgt|business-industry-applications|people-business-mgt"
    "nazril/modul-materi-herai (1)/modul-materi-herai/business-industry-application/Modul_AI_for_Healthcare_HerAI.md|ai-healthcare|business-industry-applications|healthcare"
    "nazril/modul-materi-herai (1)/modul-materi-herai/business-industry-application/Modul_AI_for_Manufacturing_HerAI.md|ai-manufacturing|business-industry-applications|manufacturing"
    "nazril/modul-materi-herai (1)/modul-materi-herai/business-industry-application/Modul_AI_for_Geospatial_HerAI.md|ai-geospatial|business-industry-applications|geospatial"
    "nazril/modul-materi-herai (1)/modul-materi-herai/business-industry-application/Modul_AI_for_Culture_HerAI.md|ai-culture|business-industry-applications|culture"
)

for MODULE in "${MODULES[@]}"; do
    IFS="|" read -r MD_PATH BASE_ID CATEGORY_FOLDER MODULE_FOLDER <<< "$MODULE"
    echo "======================================================"
    echo "Rebuilding: $BASE_ID"
    node scripts/module-tools/build_module.js "$MD_PATH" "$BASE_ID" "$CATEGORY_FOLDER" "$MODULE_FOLDER"
done

echo "======================================================"
echo "Semua modul berhasil di-rebuild! Silakan hard refresh browser Anda."
