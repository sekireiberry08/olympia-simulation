import QuestionFrame from "@/components/rounds/khoi-dong/QuestionFrame";
import ScoreFrame from "@/components/rounds/khoi-dong/ScoreFrame";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-end gap-10">
        <QuestionFrame
          question="Đây là nội dung câu hỏi của chương trình Olympia."
          time={60}
        />

        <ScoreFrame score={120} name="Thí sinh 1" />
      </div>
    </div>
  );
}
