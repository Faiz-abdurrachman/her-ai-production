# Fellow Dashboard Course Structure

Struktur folder course mengikuti category/domain yang tampil di UI `modules.html`.

```text
fellow-dashboard/
  foundation-core-ai/
    ai-fundamentals-advanced/
      overview.html
      ai-fundamentals/
        01-pengantar-ai/
        02-python-untuk-ai/
        03-konsep-ai-modern/
      ai-advanced/
    math-for-ai/
    machine-learning/
    deep-learning/
    reinforcement-learning/

  generative-multimodal-ai/
    generative-ai.html
    llm/
    vlm/
    multimodal-llm/
    agentic-ai/

  data-engineering-domains/
    computer-vision.html
    computer-vision/
      lessons/
    nlp.html
    nlp/
      lessons/
    bioinformatics/
    data-engineering/
    data-science/
    infrastructure/
    deployment/
    front-end/
    back-end/

  business-industry-applications/
    business-insight/
    people-business-mgt/
    ai-for-culture/
    ai-for-healthcare/
    ui-ux-design-thinking/
    ai-for-manufacturing/
    ai-for-geospatial/

  specialization-tracks/
    computer-vision/
    speech-recognition/
    nlp-llm/
    mlops-deployment/
    multimodal-llm/
    medical-biology-ai/
```

URL peserta tetap diatur oleh `js/router.js`. Struktur folder ini adalah hierarchy produk, bukan route URL.
