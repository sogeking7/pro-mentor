import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto px-4 w-full", {
  variants: {
    variant: {
      largePadded: "px-4 container max-w-screen-2xl",
      fullMobileConstrainedPadded: "max-w-7xl",
      constrainedPadded: "max-w-[1400px] px-3 md:px-6 xl:px-8",
      fullMobileBreakpointPadded: "container mx-auto",
      breakpointPadded: "container mx-auto px-4",
      narrowConstrainedPadded: "px-4 max-w-3xl",
    },
  },
  defaultVariants: {
    variant: "constrainedPadded",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  asChild,
  className,
  children,
  variant,
  ...props
}) => {
  const Comp = asChild ? React.Fragment : "div";
  const containerClasses = cn(containerVariants({ variant }), className);

  return (
    <Comp className={containerClasses} {...props}>
      {variant === "narrowConstrainedPadded" ? (
        <div className="mx-auto max-w-3xl">{children}</div>
      ) : (
        children
      )}
    </Comp>
  );
};

export { Container, containerVariants };
