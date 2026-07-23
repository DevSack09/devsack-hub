"use client";

import { useActionState, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authenticate } from "@/lib/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-sm rounded-2xl border border-border bg-surface/80 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/40"
    >
      <h1 className="font-primary text-2xl font-bold text-foreground">Iniciar sesión</h1>
      <p className="mt-1 font-secondary text-sm text-foreground/60">
        Acceso al panel de administración
      </p>

      <form action={formAction} className="mt-8 space-y-5">
        <Input id="email" name="email" type="email" label="Correo electrónico" autoComplete="email" required />

        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-3 top-[38px] text-foreground/50 transition-colors hover:text-foreground"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div aria-live="polite">
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-red-400"
            >
              {errorMessage}
            </motion.p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="flex w-full items-center justify-center gap-2">
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isPending ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </motion.div>
  );
}
