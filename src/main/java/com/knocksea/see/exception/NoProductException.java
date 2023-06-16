package com.knocksea.see.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NoProductException extends RuntimeException{

    public NoProductException(String message) {super(message);}
}
