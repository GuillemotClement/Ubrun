# Ubrun

Application d'aide à la course à pied.

## Convention

### Files

- `app/{contact}/actions.ts`: logique lié au server action et interactions ui
- `/lib/{contact}.service.ts`: logique métier, accès DB et appells externes

Les fichiers de services contiennent la logique métier réutilisable. Ils contiennent les méthodes pour communiquer avec la base de données.

Les fichiers actions contiennent les méthodes appelé par les composant (`submitContactForm`, etc)

Le formulaire appelle directement la méthode contenu dans le fichier `use server`.
