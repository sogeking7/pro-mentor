import { Container } from "@/ui/Container";

export default function AppFooter() {
  return (
    <footer className="border-t bg-white text-gray-600">
      <Container className="space-y-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-blue-600">PRO-mentor.kz</h2>
        <p className="text-sm">
          Заманауи білім беру әдістемелері мен инновациялық тәсілдер
        </p>
        <p className="text-sm">
          Мұғалімдердің кәсіби дамуы мен сапалы білім беруге арналған платформа
        </p>
        <p className="text-xs text-gray-400">
          © 2025 PRO-mentor. Барлық құқықтар қорғалған.
        </p>
      </Container>
    </footer>
  );
}
