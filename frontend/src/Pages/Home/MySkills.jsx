// Tu as du JSON importé ici, si tu ne t'en sers plus car tu fetch depuis le backend,
// tu pourras supprimer cette ligne plus tard pour nettoyer ton code.
import SkillsSection from '../../composents/SkillsSection/SkillsSection';

export default function MySkills() {
  return (
    <>
      {/*
        On garde la section mais on retire les marges/paddings forcés
        pour laisser le composant enfant gérer son propre espace responsive (container, px-4, etc.)
      */}
      <section className="w-full bg-[#0B0F19]">
        <div className="w-full">
          <SkillsSection />
        </div>
      </section>
    </>
  );
}
